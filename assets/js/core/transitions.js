export function initPageTransitions() {
  // fade in
  window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
  });

  // fade out
  document.querySelectorAll("a[href]").forEach(link => {
    const url = link.getAttribute("href");

    if (!url.startsWith("#") && !url.startsWith("http")) {
      link.addEventListener("click", e => {
        e.preventDefault();
        document.body.classList.remove("page-loaded");

        setTimeout(() => {
          window.location.href = url;
        }, 300);
      });
    }
  });
}

export function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      e.preventDefault();

      const offset = 120;
      const y =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      gsap.to(window, {
        scrollTo: y,
        duration: 1.2,
        ease: "power3.inOut"
      });
    });
  });
}
