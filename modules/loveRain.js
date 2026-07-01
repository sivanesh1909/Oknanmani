// Love Rain Effect
import { random, randomInt } from "./utils.js";

export class LoveRain {
  constructor() {
    this.container = document.body;
    this.isRaining = false;
    this.rainInterval = null;
  }

  /**
   * Initialize love rain
   */
  init() {
    // Start first rain after 30 seconds
    setTimeout(() => this.startRain(), 30000);

    // Trigger rain every 2-4 minutes
    this.rainInterval = setInterval(() => {
      this.startRain();
    }, 120000 + Math.random() * 120000);
  }

  /**
   * Start rain effect
   */
  startRain() {
    if (this.isRaining) return;

    this.isRaining = true;
    const duration = 8000; // 8 seconds of rain

    // Create hearts falling
    for (let i = 0; i < randomInt(30, 50); i++) {
      setTimeout(() => this.createRaindrop(), i * (duration / 50));
    }

    // Stop rain after duration
    setTimeout(() => {
      this.isRaining = false;
    }, duration);
  }

  /**
   * Create a single raindrop (heart)
   */
  createRaindrop() {
    const heart = document.createElement("div");
    const size = random(1, 2.5);
    const x = Math.random() * 100;

    heart.className = "love-raindrop";
    heart.textContent = "❤️";
    heart.style.cssText = `
      position: fixed;
      left: ${x}vw;
      top: -20px;
      font-size: ${size}rem;
      pointer-events: none;
      z-index: 50;
      animation: heartRain ${random(3, 6)}s linear forwards;
      opacity: ${0.6 + Math.random() * 0.4};
      filter: drop-shadow(0 0 ${size}px rgba(255, 142, 203, 0.6));
    `;

    this.container.appendChild(heart);

    // Remove after animation
    const duration = parseInt(heart.style.animation.split(" ")[1]) * 1000;
    setTimeout(() => heart.remove(), duration);
  }

  /**
   * Stop love rain
   */
  stop() {
    if (this.rainInterval) {
      clearInterval(this.rainInterval);
    }
    this.isRaining = false;
  }
}

export function initLoveRain() {
  const rain = new LoveRain();
  rain.init();
  return rain;
}
