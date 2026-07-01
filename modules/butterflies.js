// Floating Butterflies
import { random, randomInt } from "./utils.js";

export class FloatingButterflies {
  constructor() {
    this.container = document.body;
    this.butterflies = [];
    this.isActive = true;
  }

  /**
   * Initialize butterflies
   */
  init() {
    // Create 3-5 butterflies
    const count = randomInt(3, 5);
    for (let i = 0; i < count; i++) {
      setTimeout(() => this.createButterfly(), i * 3000);
    }
  }

  /**
   * Create a butterfly
   */
  createButterfly() {
    if (!this.isActive) return;

    const butterfly = document.createElement("div");
    butterfly.className = "butterfly";

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;

    butterfly.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      font-size: ${random(1.5, 2.5)}rem;
      pointer-events: none;
      z-index: 50;
      animation: butterflyFly ${random(8, 15)}s linear forwards;
    `;

    butterfly.textContent = "🦋";
    this.container.appendChild(butterfly);

    // Remove after animation
    const duration = parseInt(butterfly.style.animation.split(" ")[1]) * 1000;
    setTimeout(() => {
      butterfly.remove();
      // Create new butterfly after some time
      if (this.isActive) {
        setTimeout(() => this.createButterfly(), random(5000, 15000));
      }
    }, duration);
  }

  /**
   * Stop butterflies
   */
  stop() {
    this.isActive = false;
    document.querySelectorAll(".butterfly").forEach((b) => b.remove());
  }
}

export function initFloatingButterflies() {
  const butterflies = new FloatingButterflies();
  butterflies.init();
  return butterflies;
}
