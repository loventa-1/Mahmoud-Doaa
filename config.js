/* ============================================================
   LOVENTA — WEDDING CONFIGURATION
   كل الإعدادات القابلة للتعديل في مكان واحد
   ============================================================ */

const WEDDING_CONFIG = {

  /* ---------- بيانات العروسين ---------- */
  couple: {
    name1: "Mahmoud",          // اسم العريس
    name2: "Doaa",           // اسم العروس
    hashtag: "MahmoudAndDoaa",
    // اسم مختصر للـ footer والـ monogram
    footerNames: "Mahmoud & Doaa",
  },

  /* ---------- تاريخ ووقت الزفاف ---------- */
  wedding: {
    date: "2026-11-14T17:00:00+03:00",   // ISO format
    displayDate: "14 · 11 · 2026",
    displayDateShort: "14 | 11 | 2026",
    timezone: "Africa/Cairo",
  },

  /* ---------- المكان ---------- */
  venue: {
    name: "Marriott Mena House",
    city: "Giza, Egypt",
    mapUrl: "https://maps.google.com/?q=Marriott+Mena+House+Giza+Egypt",
    image: "assets/images/hall.webp",
  },

  /* ---------- الروابط الاجتماعية ---------- */
  social: {
    instagram: "https://www.instagram.com/love__nta/",
    tiktok: "https://www.tiktok.com/@loventa68",
    brandName: "Loventa",
  },

  /* ---------- الملفات والمسارات (تأكد إنها موجودة) ---------- */
  assets: {
    preloaderVideo: "assets/images/IMG_0434.MP4",   // ⚠️ اتأكد إن الملف موجود
    preloaderPoster: "assets/images/door.jpg",       // ⚠️ اتأكد إن الملف موجود
    heroVideo: "assets/images/hero.MP4",             // ⚠️ اتأكد إن الملف موجود
    backgroundMusic: "assets/music/music.mp3",          // ⚠️ اتأكد إن الملف موجود
  },

  /* ---------- إعدادات السلوك ---------- */
  behavior: {
    preloaderTimeoutMs: 5000,      // 5 ثواني بدل 9
    musicVolume: 0.5,
    countdownTickMs: 1000,
    lenisDuration: 1.4,
  },

  /* ---------- محتوى الـ Timeline ---------- */
  timeline: [
    { year: "2019", eyebrow: "The Beginning", title: "A First Glance",
      text: "A library in Istanbul. A book left open. A conversation that never ended.",
      image: "assets/images/couple01.jpg" },
    { year: "2021", eyebrow: "The Journey", title: "Two Cities, One Promise",
      text: "Letters across the Bosphorus. Coffee at dawn. A love that crossed time zones.",
      image: "assets/images/couple02.jpg" },
    { year: "2023", eyebrow: "The Promise", title: "The Question",
      text: "Beneath a lantern-lit sky in Marrakech, a quiet question and an unhesitating yes.",
      image: "assets/images/couple03.jpg" },
    { year: "2026", eyebrow: "Forever Begins", title: "The Next Chapter",
      text: "And now, with the prayers of our families, we invite you to witness our beginning.",
      image: "assets/images/couple04.jpg" },
  ],

  /* ---------- محتوى الـ Schedule ---------- */
  schedule: [
    { time: "5:00 PM",  title: "Ceremony",    icon: "rings",
      desc: "An intimate union beneath an arch of olive branches and cream roses." },
    { time: "6:30 PM",  title: "Dinner",      icon: "utensils",
      desc: "A seated dinner curated by Chef Marin. Five courses, paired wines." },
    { time: "9:00 PM",  title: "Cake & Toasts", icon: "cake",
      desc: "Words from our beloveds. A cake of vanilla, honey, and almond." },
    { time: "9:45 PM",  title: "First Dance", icon: "music",
      desc: "A song we wrote together. Please join us on the floor." },
    { time: "10:30 PM", title: "Celebration", icon: "star",
      desc: "Until the last star turns home." },
  ],

  /* ---------- محتوى الأسئلة الشائعة ---------- */
  faq: [
    { q: "Can I bring a plus-one?",
      a: "Each invitation includes the named guests on the envelope. Please RSVP for those listed." },
    { q: "Will there be parking on site?",
      a: "Yes — complimentary valet at the East Gate from 4:00 PM." },
    { q: "Are children welcome?",
      a: "We've planned an adult-only evening so all guests may celebrate freely. Thank you for understanding." },
    { q: "What if I have dietary restrictions?",
      a: "Please indicate them on your RSVP and our chef will prepare your meal personally." },
    { q: "When does the celebration end?",
      a: "Music will play until late. Stay as long as you wish." },
  ],

  /* ---------- Dress code palette ---------- */
  palette: [
    { color: "#F8F6F3", label: "Cream"  },
    { color: "#EFE9E2", label: "Ivory"  },
    { color: "#D8C8B7", label: "Sand"   },
    { color: "#C7A27C", label: "Camel"  },
    { color: "#7A6A55", label: "Taupe"  },
    { color: "#222222", label: "Black"  },
  ],
};

// اجعله متاح globally
window.WEDDING_CONFIG = WEDDING_CONFIG;