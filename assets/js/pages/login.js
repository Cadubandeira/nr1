import { initCursor } from "../core/cursor.js";
import { initPageTransitions } from "../core/transitions.js";

initCursor();
initPageTransitions();

const backButton = document.querySelector("[data-back]");
if (backButton) {
  backButton.addEventListener("click", () => history.back());
}

