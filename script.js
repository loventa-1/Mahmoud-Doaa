/* ============================================================
   LOVENTA — Wedding Invitation Script
   كل المتغيرات في مكان واحد (CONFIG) لتسهيل التعديل
   ============================================================ */

(() => {

 /* ============================================================
     1. الإعدادات — تأتي من config.js
     ============================================================ */
  const CONFIG = window.WEDDING_CONFIG;

  if (!CONFIG) {
    console.error("❌ WEDDING_CONFIG مش موجود. تأكد إن config.js محمّل قبل script.js");
    return;
  }

  // كائن موحّد لكل الـ DOM references
  const DOM = {
    preloader:       document.getElementById("preloader"),
    preloaderVideo:  document.getElementById("preloaderVideo"),
    preloaderPoster: document.getElementById("preloaderPoster"),
    site:            document.getElementById("site"),
    heroVideo:       document.getElementById("heroVideo"),
    bgMusic:         document.getElementById("bgMusic"),
    musicToggle:     document.getElementById("musicToggle"),
    lightbox:        document.getElementById("lightbox"),
    lightboxImg:     document.getElementById("lightboxImg"),
    timelineFill:    document.getElementById("timelineFill"),
    timeline:        document.querySelector(".timeline"),
    schedFill:       document.getElementById("schedFill"),
    schedRoute:      document.querySelector(".sched-route"),
    rsvpForm:        document.getElementById("rsvpForm"),
    rsvpSuccess:     document.getElementById("rsvpSuccess"),
    faqRoot:         document.getElementById("faq"),
  };

  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ============================================================
     2. Preloader — Click to open the door
     ============================================================ */
  const WEDDING_DATE = new Date(CONFIG.wedding.date);
  let preloaderTimeout;

  function revealSite() {
    document.body.classList.remove("locked");
    if (DOM.site) DOM.site.classList.add("visible");
    if (DOM.heroVideo) DOM.heroVideo.play().catch(() => {});
    initLenis();
    initHeroReveal();
  }

  function endPreloader() {
    if (!DOM.preloader || DOM.preloader.classList.contains("fade-out")) return;
    DOM.preloader.classList.add("whiteout");
    setTimeout(() => {
      revealSite();
      DOM.preloader.classList.add("fade-out");
      setTimeout(() => DOM.preloader.classList.add("hidden"), 1000);
    }, 500);
  }

  if (DOM.preloaderPoster && DOM.preloaderVideo) {
    DOM.preloaderPoster.addEventListener("click", () => {
      DOM.preloaderPoster.classList.add("hidden");
      DOM.preloaderVideo.play().catch(() => endPreloader());
      preloaderTimeout = setTimeout(endPreloader, CONFIG.behavior.preloaderTimeoutMs);
    });
    DOM.preloaderVideo.addEventListener("ended", () => {
      clearTimeout(preloaderTimeout);
      endPreloader();
    });
  } else {
    // Fallback لو الـ preloader مش موجود
    setTimeout(endPreloader, 1000);
  }

  /* ============================================================
     3. Lenis Smooth Scroll
     ============================================================ */
  let lenis = null;

  function initLenis() {
    if (typeof Lenis === "undefined") return;
    lenis = new Lenis({
      duration: CONFIG.behavior.lenisDuration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    // Smooth anchor links
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: 0, duration: 1.6 });
          }
        }
      });
    });
  }

  /* ============================================================
     4. Hero Staggered Reveal
     ============================================================ */
  function initHeroReveal() {
    $$(".hero .reveal, .hero .reveal-mask").forEach((el) => {
      const delay = parseInt(el.dataset.delay || "0", 10);
      setTimeout(() => el.classList.add("is-in"), delay);
    });
  }

  /* ============================================================
     5. IntersectionObserver — Scroll Reveals
     ============================================================ */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "-10% 0px -10% 0px", threshold: 0.05 });

  $$(".scroll-reveal").forEach((el) => io.observe(el));

  /* ============================================================
     6. Countdown
     ============================================================ */
  function tickCountdown() {
    const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
    const days    = Math.floor(diff / 86_400_000);
    const hours   = Math.floor((diff / 3_600_000) % 24);
    const minutes = Math.floor((diff / 60_000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const pad = (n) => String(n).padStart(2, "0");

    $$("[data-countdown]").forEach((cd) => {
      const d = cd.querySelector("[data-d]"); if (d) d.textContent = pad(days);
      const h = cd.querySelector("[data-h]"); if (h) h.textContent = pad(hours);
      const m = cd.querySelector("[data-m]"); if (m) m.textContent = pad(minutes);
      const s = cd.querySelector("[data-s]"); if (s) s.textContent = pad(seconds);
    });
  }
  tickCountdown();
  setInterval(tickCountdown, CONFIG.behavior.countdownTickMs);

  /* ============================================================
     7. FAQ Accordion
     ============================================================ */
  function bindAccordion(root, itemSel) {
    if (!root) return;
    root.addEventListener("click", (e) => {
      const head = e.target.closest("button");
      if (!head) return;
      const item = head.closest(itemSel);
      if (!item) return;
      const wasOpen = item.classList.contains("open");

      $$(itemSel, root).forEach((i) => {
        i.classList.remove("open");
        const btn = i.querySelector("button");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      if (!wasOpen) {
        item.classList.add("open");
        head.setAttribute("aria-expanded", "true");
      }
    });
  }
  bindAccordion(DOM.faqRoot, ".faq__item");

  /* ============================================================
     8. Lightbox (للـ Gallery إن وجد)
     ============================================================ */
  if (DOM.lightbox && DOM.lightboxImg) {
    $$(".masonry__item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const src = btn.dataset.src;
        if (!src) return;
        DOM.lightboxImg.src = src;
        DOM.lightbox.hidden = false;
        requestAnimationFrame(() => DOM.lightbox.classList.add("visible"));
        if (lenis) lenis.stop();
      });
    });

    const closeLightbox = () => {
      DOM.lightbox.classList.remove("visible");
      setTimeout(() => {
        DOM.lightbox.hidden = true;
        DOM.lightboxImg.src = "";
        if (lenis) lenis.start();
      }, 400);
    };

    DOM.lightbox.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !DOM.lightbox.hidden) closeLightbox();
    });
  }

  /* ============================================================
     9. Timeline Rail Fill
     ============================================================ */
  if (DOM.timelineFill && DOM.timeline) {
    const updateRail = () => {
      const rect = DOM.timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const progressed = Math.min(Math.max(vh - rect.top, 0), total);
      const pct = Math.max(0, Math.min(1, progressed / total));
      DOM.timelineFill.style.height = (pct * 100) + "%";
    };
    window.addEventListener("scroll", updateRail, { passive: true });
    window.addEventListener("resize", updateRail);
    updateRail();
  }

  /* ============================================================
     10. Schedule Route Fill
     ============================================================ */
  if (DOM.schedFill && DOM.schedRoute) {
    const updateSchedRail = () => {
      const rect = DOM.schedRoute.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.4;
      const progressed = Math.min(Math.max(vh * 0.7 - rect.top, 0), total);
      const pct = Math.max(0, Math.min(1, progressed / total));
      DOM.schedFill.style.height = (pct * 100) + "%";

      $$(".sched-route__item").forEach((item) => {
        const iRect = item.getBoundingClientRect();
        if (iRect.top < vh * 0.75) {
          const dot = item.querySelector(".sched-route__dot");
          if (dot) dot.style.background = "var(--accent)";
        }
      });
    };
    window.addEventListener("scroll", updateSchedRail, { passive: true });
    window.addEventListener("resize", updateSchedRail);
    updateSchedRail();
  }

  /* ============================================================
     11. RSVP Form
     ============================================================ */
  if (DOM.rsvpForm && DOM.rsvpSuccess) {
    DOM.rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      DOM.rsvpForm.style.transition = "opacity .6s";
      DOM.rsvpForm.style.opacity = "0";
      setTimeout(() => {
        DOM.rsvpForm.hidden = true;
        DOM.rsvpSuccess.hidden = false;
      }, 600);
    });
  }

  /* ============================================================
     12. Background Music (بدء بعد أول تفاعل)
     ============================================================ */
  if (DOM.bgMusic && DOM.musicToggle) {
    const iconPlay  = $(".icon-play", DOM.musicToggle);
    const iconPause = $(".icon-pause", DOM.musicToggle);
    let musicStarted = false;

    const setUI = (playing) => {
      if (iconPlay)  iconPlay.style.display  = playing ? "none"  : "block";
      if (iconPause) iconPause.style.display = playing ? "block" : "none";
      DOM.musicToggle.setAttribute("aria-pressed", String(playing));
    };

    const playMusic = () => {
      DOM.bgMusic.volume = CONFIG.behavior.musicVolume;
      return DOM.bgMusic.play().then(() => setUI(true));
    };

    const pauseMusic = () => {
      DOM.bgMusic.pause();
      setUI(false);
    };

    const onFirstInteraction = () => {
      if (musicStarted) return;
      playMusic()
        .then(() => {
          musicStarted = true;
          ["click", "touchstart"].forEach((evt) =>
            document.removeEventListener(evt, onFirstInteraction)
          );
        })
        .catch(() => { /* المتصفح منع التشغيل، هيستنى تفاعل تاني */ });
    };

    ["click", "touchstart"].forEach((evt) =>
      document.addEventListener(evt, onFirstInteraction, { passive: true })
    );

    DOM.musicToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!musicStarted) {
        playMusic().then(() => { musicStarted = true; }).catch(() => {});
        return;
      }
      if (DOM.bgMusic.paused) playMusic().catch(() => {});
      else pauseMusic();
    });

    // تعيين الحالة الابتدائية للأيقونات
    setUI(false);
  }

})();