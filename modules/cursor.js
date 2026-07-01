// Premium Custom Cursor
import { CONFIG } from "./config.js";

export class PremiumCursor {
  constructor() {
    this.cursor = null;
    this.trail = [];
    this.maxTrail = 8;
  }

  /**
   * Initialize premium cursor
   */
  init() {
    this.createCursor();
    this.attachEvents();
    this.animate();
  }

  /**
   * Create cursor element
   */
  createCursor() {
    const style = document.createElement("style");
    style.textContent = `
      body {
        cursor: none;
      }
      
      .premium-cursor {
        position: fixed;
        width: ${CONFIG.CURSOR_SIZE}px;
        height: ${CONFIG.CURSOR_SIZE}px;
        border: 2px solid #ff8ecb;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: screen;
        box-shadow: 0 0 12px #ff8ecb, inset 0 0 8px #c4b3ff;
      }
      
      .premium-cursor::before {
        content: "❤️";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 10px;
        filter: drop-shadow(0 0 2px #ff8ecb);
      }
      
      .premium-cursor.active {
        transform: scale(1.4);
        box-shadow: 0 0 20px #ff8ecb, inset 0 0 12px #c4b3ff;
      }
    `;
    document.head.appendChild(style);

    this.cursor = document.createElement("div");
    this.cursor.className = "premium-cursor";
    document.body.appendChild(this.cursor);
  }

  /**
   * Attach event listeners
   */
  attachEvents() {
    document.addEventListener("mousemove", (e) => this.onMouseMove(e), false);
    document.addEventListener("mousedown", () => this.onMouseDown(), false);
    document.addEventListener("mouseup", () => this.onMouseUp(), false);
  }

  /**
   * Handle mouse move
   */
  onMouseMove(e) {
    if (!this.cursor) return;

    const x = e.clientX - CONFIG.CURSOR_SIZE / 2;
    const y = e.clientY - CONFIG.CURSOR_SIZE / 2;

    this.cursor.style.transform = `translate(${x}px, ${y}px)`;

    // Create trail
    this.trail.push({
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    });

    if (this.trail.length > this.maxTrail) {
      this.trail.shift();
    }
  }

  /**
   * Handle mouse down
   */
  onMouseDown() {
    if (this.cursor) {
      this.cursor.classList.add("active");
      this.createClickRipple();
    }
  }

  /**
   * Handle mouse up
   */
  onMouseUp() {
    if (this.cursor) {
      this.cursor.classList.remove("active");
    }
  }

  /**
   * Create click ripple effect
   */
  createClickRipple() {
    const ripple = document.createElement("div");
    ripple.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid #ff8ecb;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${this.cursor.style.left};
      top: ${this.cursor.style.top};
      animation: ripple 0.6s ease-out forwards;
    `;

    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  /**
   * Animation loop for trail
   */
  animate() {
    const particles = document.querySelectorAll(".cursor-particle");
    particles.forEach((p) => p.remove());

    const now = Date.now();
    this.trail.forEach((point, i) => {
      const age = now - point.time;
      const maxAge = 300;
      if (age > maxAge) return;

      const opacity = 1 - age / maxAge;
      const size = 4 + (i / this.trail.length) * 6;

      const particle = document.createElement("div");
      particle.className = "cursor-particle";
      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 142, 203, ${opacity * 0.8});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${point.x - size / 2}px;
        top: ${point.y - size / 2}px;
        box-shadow: 0 0 ${size * 2}px rgba(255, 142, 203, ${opacity * 0.5});
      `;

      document.body.appendChild(particle);
    });

    requestAnimationFrame(() => this.animate());
  }
}

export function initPremiumCursor() {
  const cursor = new PremiumCursor();
  cursor.init();
  return cursor;
}
