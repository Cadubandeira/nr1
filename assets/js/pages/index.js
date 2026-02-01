import { initCursor } from "../core/cursor.js";
import { initServices } from "../core/navigation.js";
import {
  initPageTransitions,
  initAnchorScroll
} from "../core/transitions.js";
import { initAnimations } from "../core/animations.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("index.js carregado");

  initCursor();
  initServices();
  initPageTransitions();
  initAnchorScroll();
  initAnimations();
});
