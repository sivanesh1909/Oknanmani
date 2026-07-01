// Live Moon Phase Display
import { getMoonPhase } from "./utils.js";

export class LiveMoon {
  constructor() {
    this.moonEl = null;
    this.container = document.body;
  }

  /**
   * Initialize moon display
   */
  init() {
    this.createMoonDisplay();
    this.updateMoon();
    setInterval(() => this.updateMoon(), 60000); // Update every minute
  }

  /**
   * Create moon display element
   */
  createMoonDisplay() {
    const style = document.createElement("style");
    style.textContent = `
      .live-moon {
        position: fixed;
        top: 1.5rem;
        left: 1.5rem;
        font-size: 3rem;
        z-index: 100;
        cursor: pointer;
        filter: drop-shadow(0 0 8px rgba(255, 182, 208, 0.6));
        transition: transform 0.3s;
      }
      
      .live-moon:hover {
        transform: scale(1.2);
      }
    `;
    document.head.appendChild(style);

    this.moonEl = document.createElement("div");
    this.moonEl.className = "live-moon";
    this.moonEl.addEventListener("dblclick", () => this.triggerSecretPhoto());
    this.container.appendChild(this.moonEl);
  }

  /**
   * Update moon display
   */
  updateMoon() {
    const phase = getMoonPhase();
    const moonEmojis = [
      "🌑", // New moon
      "🌒", // Waxing crescent
      "🌓", // First quarter
      "🌔", // Waxing gibbous
      "🌕", // Full moon
      "🌖", // Waning gibbous
      "🌗", // Last quarter
      "🌘", // Waning crescent
    ];

    const index = Math.round(phase * (moonEmojis.length - 1));
    this.moonEl.textContent = moonEmojis[index];
  }

  /**
   * Trigger secret photo on double click
   */
  triggerSecretPhoto() {
    const secret = document.createElement("div");
    secret.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      display: grid;
      place-items: center;
      z-index: 2000;
      animation: fadeIn 0.5s ease-out;
    `;

    secret.innerHTML = `
      <div style="text-align: center; color: #fff7fe;">
        <p style="font-size: 2rem; margin-bottom: 1rem;">🌙✨</p>
        <p style="font-size: 1.5rem; margin: 0;">Under the moonlight, every moment with you is magical.</p>
        <p style="font-size: 1.2rem; margin: 1.5rem 0 0; opacity: 0.8;">Click anywhere to close</p>
      </div>
    `;

    document.body.appendChild(secret);
    secret.addEventListener("click", () => {
      secret.style.animation = "fadeOut 0.5s ease-out forwards";
      setTimeout(() => secret.remove(), 500);
    });
  }
}

export function initLiveMoon() {
  const moon = new LiveMoon();
  moon.init();
  return moon;
}
