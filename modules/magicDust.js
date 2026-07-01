// Magic Dust - Click Particles
import { random } from "./utils.js";

export class MagicDust {
  constructor() {
    this.container = document.body;
  }

  /**
   * Initialize magic dust
   */
  init() {
    document.addEventListener("click", (e) => this.createDust(e), false);
  }

  /**
   * Create dust burst on click
   */
  createDust(e) {
    const count = Math.floor(random(8, 15));

    for (let i = 0; i < count; i++) {
      const dust = document.createElement("div");
      dust.className = "magic-dust";

      const size = random(4, 12);
      const angle = (i / count) * Math.PI * 2;
      const velocity = random(2, 8);
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      dust.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #ffd7af, #ff8ecb);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 ${size}px rgba(255, 142, 203, 0.8);
      `;

      this.container.appendChild(dust);

      // Animate dust
      let x = e.clientX;
      let y = e.clientY;
      let life = 1;
      const duration = random(400, 800);
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress >= 1) {
          dust.remove();
          return;
        }

        // Apply gravity
        vy += 0.2;
        x += vx;
        y += vy;
        life = 1 - progress;

        dust.style.left = x + "px";
        dust.style.top = y + "px";
        dust.style.opacity = life;

        requestAnimationFrame(animate);
      };

      animate();
    }
  }
}

export function initMagicDust() {
  const dust = new MagicDust();
  dust.init();
  return dust;
}
