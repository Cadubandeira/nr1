export function initServices() {
  const cards = document.querySelectorAll("[data-service]");
  if (!cards.length) return;

  // 🔒 estado inicial seguro
  cards.forEach((card, index) => {
    card.classList.toggle("active", index === 0);
  });

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
}
