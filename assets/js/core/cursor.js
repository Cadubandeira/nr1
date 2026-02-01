export function initCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  const moveX = gsap.quickTo(cursor, "x", {
    duration: 0.15,
    ease: "power3.out"
  });

  const moveY = gsap.quickTo(cursor, "y", {
    duration: 0.15,
    ease: "power3.out"
  });

  document.addEventListener("mousemove", e => {
    moveX(e.clientX - 10);
    moveY(e.clientY - 10);
  });

  document.querySelectorAll("a, button, [data-service]").forEach(el => {
    el.addEventListener("mouseenter", () =>
      gsap.to(cursor, { scale: 3 })
    );
    el.addEventListener("mouseleave", () =>
      gsap.to(cursor, { scale: 1 })
    );
  });
}
