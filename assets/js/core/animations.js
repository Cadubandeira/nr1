export function initAnimations() {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Hero
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      delay: 0.5
    })
    .to("#hero-desc", {
      opacity: 1,
      y: -10,
      duration: 1
    }, "-=1")
    .to("#hero-cta", {
      opacity: 1,
      y: -10,
      duration: 1
    }, "-=0.8");

  // Progress bar
  gsap.to("#progress-bar", {
    width: "100%",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3
    }
  });

  // Scroll reveals
  gsap.utils
    .toArray(".bento-item, .reveal-left, .reveal-right, .impact-card")
    .forEach(item => {
      gsap.from(item, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });
}
