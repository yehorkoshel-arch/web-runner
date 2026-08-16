const header = document.querySelector(".site-header");

window.addEventListener(
  "scroll",
  () => {
    const raised = window.scrollY > 16;
    header?.classList.toggle("is-raised", raised);
  },
  { passive: true },
);

const cards = document.querySelectorAll(".intro-grid article, .city-card, .feature-grid article, .timeline li");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.14 },
);

cards.forEach((card) => observer.observe(card));
