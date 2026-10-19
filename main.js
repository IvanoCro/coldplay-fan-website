

 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)
  
  gsap.from(".main-title", 
    { 
    duration: 0.5,
    opacity: 0, 
    ease: "power3.out",
    y: 50 }
);

  gsap.from(".desc-text", 
    { 
    duration: 1,
    delay: 0.1,
    opacity: 0, 
    ease: "power3.out",
    y: 50 }
);
gsap.from(".btn", 
    { 
    duration: 1,
    delay: 0.1,
    opacity: 0, 
    ease: "power3.out",
    y: 50 }
);

gsap.from(".img", 
    { 
    duration: 1,
    delay: 0.4,
    opacity: 0, 
    ease: "power3.out",
    y: 50 }
);

const siteNav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const heroSection = document.querySelector(".hero-section");

function closeMobileNav() {
  siteNav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
  heroSection.style.removeProperty("--open-mobile-nav-offset");
  ScrollTrigger.refresh();
}

navToggle.addEventListener("click", () => {
  const isOpen = !siteNav.classList.contains("is-open");
  siteNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen && window.matchMedia("(max-width: 600px)").matches) {
    heroSection.style.setProperty(
      "--open-mobile-nav-offset",
      `${siteNav.getBoundingClientRect().height + 16}px`
    );
  } else {
    heroSection.style.removeProperty("--open-mobile-nav-offset");
  }
  ScrollTrigger.refresh();
});

siteNav.querySelectorAll(".site-nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileNav();
  });
});

document.addEventListener("click", (event) => {
  if (siteNav.classList.contains("is-open") && !siteNav.contains(event.target)) {
    closeMobileNav();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
    closeMobileNav();
    navToggle.focus();
  }
});

const concertsSection = document.querySelector(".concerts-section");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const concertsObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      return;
    }

    gsap.fromTo(
      ".concerts-content > *",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      }
    );
    gsap.fromTo(
      ".concerts-art",
      { opacity: 0, scale: 0.82, rotate: -8 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "power3.out" }
    );
    concertsObserver.unobserve(concertsSection);
  }, { threshold: 0.15 });

  concertsObserver.observe(concertsSection);
}

let tl = gsap.timeline( {
  scrollTrigger: {
    id: "albums",
    trigger: ".albums-section-wrapper",
    pin: true,
    start: "top top",
    end: "+=300%",
    scrub: true,
  }
});

document.querySelector('.site-nav a[href="#albums"]').addEventListener("click", (event) => {
  event.preventDefault();

  const trigger = tl.scrollTrigger;
  if (!trigger) {
    throw new Error("The albums ScrollTrigger has not been initialized.");
  }

  if (window.location.hash !== "#albums") {
    window.history.pushState(null, "", "#albums");
  }
  ScrollTrigger.refresh();
  window.scrollTo(0, trigger.start);
});

tl.to(".album-container:nth-of-type(1)", {
    rotate: -90,
    opacity: 0,
    xPercent: -100,
    yPercent: 50,
  })

  tl.fromTo(".album-container:nth-of-type(2)", {
    rotate: 90,
    opacity: 0,
    xPercent: 100,
    yPercent: 50,
  }, {
    rotate: 0,
    opacity: 1,
    xPercent: 0,
    yPercent: 0,
  }
)

tl.to(".album-container:nth-of-type(2)", {
    rotate: -90,
    opacity: 0,
    xPercent: -100,
    yPercent: 50,
  })

  tl.fromTo(".album-container:nth-of-type(3)", {
    rotate: 90,
    opacity: 0,
    xPercent: 100,
    yPercent: 50,
  }, {
    rotate: 0,
    opacity: 1,
    xPercent: 0,
    yPercent: 0,
  }
)
tl.to(".album-container:nth-of-type(3)", {
    rotate: -90,
    opacity: 0,
    xPercent: -100,
    yPercent: 50,
  })
const video = document.querySelector(".vinly-video");

function initializeScrollAnimations() {
  gsap.to(video, {
    currentTime: video.duration,
    ease: "none",
    scrollTrigger: {
      trigger: ".vinly-section",
      start: "top top",
      end: () => `+=${window.matchMedia("(max-width: 1100px)").matches ? 2200 : 4000}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  
  const timelineSec = gsap.timeline({
    scrollTrigger: {
      trigger: ".timeline-section",
      start: "top top",
      end: () => `+=${window.matchMedia("(max-width: 1100px)").matches ? 1200 : 2000}`,
      scrub: 1,
      pin: true
    }
  });


  // -------------------------------------
  // TIMELINE LINE
  // -------------------------------------

  timelineSec.to(
    ".timeline",
    {
    width: "100%",
      duration: 10,
      ease: "none"
    },
    0
  );


  // -------------------------------------
  // 2000 → OUT
  // -------------------------------------

  timelineSec.to(
    [
      ".achievement-title:nth-of-type(1)",
      ".achievement-desc:nth-of-type(1)"
    ],
    {
      opacity: 0,
      y: -30,
      visibility: "hidden",
      duration: 0.5
    },
    1.5
  );


  // -------------------------------------
  // 2001 → IN
  // -------------------------------------

  timelineSec.fromTo(
    [
      ".achievement-title:nth-of-type(2)",
      ".achievement-desc:nth-of-type(2)"
    ],
    {
      opacity: 0,
      y: 30,
      visibility: "hidden"
    },
    {
      opacity: 1,
      y: 0,
      visibility: "visible",
      duration: 0.5
    },
    1.9
  );


  // -------------------------------------
  // 2001 → OUT
  // -------------------------------------

  timelineSec.to(
    [
      ".achievement-title:nth-of-type(2)",
      ".achievement-desc:nth-of-type(2)"
    ],
    {
      opacity: 0,
      y: -30,
      visibility: "hidden",
      duration: 0.5
    },
    5.5
  );


  // -------------------------------------
  // 2002 → IN
  // -------------------------------------

  timelineSec.fromTo(
    [
      ".achievement-title:nth-of-type(3)",
      ".achievement-desc:nth-of-type(3)"
    ],
    {
      opacity: 0,
      y: 30,
      visibility: "hidden"
    },
    {
      opacity: 1,
      y: 0,
      visibility: "visible",
      duration: 0.5
    },
    6
  );


  // -------------------------------------
  // 2002 → OUT
  // -------------------------------------

  timelineSec.to(
    [
      ".achievement-title:nth-of-type(3)",
      ".achievement-desc:nth-of-type(3)"
    ],
    {
      opacity: 0,
      y: -30,
      visibility: "hidden",
      duration: 0.5
    },
    8
  );


  // -------------------------------------
  // 2003 → IN
  // -------------------------------------

  timelineSec.fromTo(
    [
      ".achievement-title:nth-of-type(4)",
      ".achievement-desc:nth-of-type(4)"
    ],
    {
      opacity: 0,
      y: 30,
      visibility: "hidden"
    },
    {
      opacity: 1,
      y: 0,
      visibility: "visible",
      duration: 0.5
    },
    8.5
  );


  ScrollTrigger.refresh();
}

if (video.readyState >= 1) {
  initializeScrollAnimations();
} else {
  video.addEventListener("loadedmetadata", initializeScrollAnimations, { once: true });
}

const cursor = document.querySelector(".custom-cursor");

const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3", scrub:1 });
const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3", scrub:1 });

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});
});

const timeline = document.querySelector(".timeline");
const years = document.querySelectorAll(".timeline-year");

// Pamti koji je indeks trenutno aktivan kako se GSAP ne bi pozivao bezpotrebno
let activeIndex = -1;

// Granice u px za aktivaciju pojedine godine (0 = 1., 1 = 2., 2 = 3., 3 = 4.)
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentRect.width;
    const breakpointWidth = entry.target.parentElement.clientWidth;
    const breakpoints = [0.18, 0.53, 0.78].map((ratio) => breakpointWidth * ratio);

    // Pronađi koja bi godina trebala biti aktivna na temelju širine
    let newIndex = 0;
    if (width < breakpoints[0]) {
      newIndex = 0;
    } else if (width >= breakpoints[0] && width < breakpoints[1]) {
      newIndex = 1;
    } else if (width >= breakpoints[1] && width < breakpoints[2]) {
      newIndex = 2;
    } else {
      newIndex = 3;
    }

    // Okini animaciju SAMO ako se promijenio aktivni element
    if (newIndex !== activeIndex) {
      activeIndex = newIndex;

      years.forEach((year, index) => {
        gsap.to(year, {
          scale: index === activeIndex ? 1.5 : 1,
          duration: 0.2,
          overwrite: "auto" // Sprečava sukobe ranijih nezavršenih animacija
        });
      });
    }
  }
});

observer.observe(timeline);