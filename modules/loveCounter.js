// Love Counter - Heartbeat Counter
import { CONFIG } from "./config.js";

export class LoveCounter {
  constructor() {
    this.container = document.body;
    this.counter = null;
    this.heartRate = 60; // Average heartbeats per minute
    this.relationshipStart = CONFIG.RELATIONSHIP_START;
  }

  /**
   * Initialize love counter
   */
  init() {
    this.createCounterDisplay();
    this.updateCounter();
    setInterval(() => this.updateCounter(), 1000);
  }

  /**
   * Create counter display element
   */
  createCounterDisplay() {
    const style = document.createElement("style");
    style.textContent = `
      .love-counter {
        position: fixed;
        top: 1.5rem;
        right: 1.5rem;
        background: rgba(255, 142, 203, 0.15);
        border: 1px solid rgba(255, 142, 203, 0.3);
        border-radius: 16px;
        padding: 1rem 1.2rem;
        color: #fff7fe;
        font-size: 0.85rem;
        backdrop-filter: blur(12px);
        z-index: 100;
        text-align: center;
        min-width: 120px;
      }
      
      .love-counter-number {
        font-size: 1.4rem;
        font-weight: 700;
        color: #ff8ecb;
        display: block;
        margin: 0.5rem 0 0;
      }
      
      .love-counter-label {
        opacity: 0.8;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    `;
    document.head.appendChild(style);

    this.counter = document.createElement("div");
    this.counter.className = "love-counter";
    this.counter.innerHTML = `
      <div class="love-counter-label">❤️ Heartbeats ❤️</div>
      <span class="love-counter-number">0</span>
    `;

    this.container.appendChild(this.counter);
  }

  /**
   * Calculate and update heartbeat count
   */
  updateCounter() {
    const now = new Date();
    const elapsedMs = now - this.relationshipStart;
    const elapsedMinutes = elapsedMs / (1000 * 60);
    const heartbeats = Math.floor(elapsedMinutes * this.heartRate);

    const numberEl = this.counter.querySelector(".love-counter-number");
    numberEl.textContent = this.formatNumber(heartbeats);
  }

  /**
   * Format large numbers with K, M suffixes
   */
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }
}

export function initLoveCounter() {
  const counter = new LoveCounter();
  counter.init();
  return counter;
}
