// Love Constellation
import { CONFIG, createHighDPICanvas, random } from "./utils.js";

export class LoveConstellation {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.stars = [];
    this.constellation = null;
  }

  /**
   * Initialize constellation
   */
  init() {
    this.createCanvas();
    this.generateConstellation();
    this.setupInteraction();
    this.draw();
  }

  /**
   * Create canvas
   */
  createCanvas() {
    const { canvas, ctx } = createHighDPICanvas(
      window.innerWidth,
      window.innerHeight
    );

    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 20;
      pointer-events: auto;
      opacity: 0.8;
    `;

    document.body.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = ctx;

    window.addEventListener("resize", () => this.handleResize());
  }

  /**
   * Generate constellation in heart shape
   */
  generateConstellation() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const scale = 80;

    // Heart shape points
    const points = [];
    for (let t = 0; t < Math.PI * 2; t += 0.1) {
      const x = centerX + scale * (16 * Math.sin(t) ** 3);
      const y = centerY - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      points.push({ x, y, glow: 0 });
    }

    this.constellation = {
      points: points,
      glowAmount: 0,
      isGlowing: false,
    };

    this.stars = points;
  }

  /**
   * Setup interaction
   */
  setupInteraction() {
    document.addEventListener("click", (e) => {
      // Check if click is near constellation
      const dist = this.distanceToConstellation(e.clientX, e.clientY);
      if (dist < 200) {
        this.activateConstellation();
      }
    });
  }

  /**
   * Distance to nearest star
   */
  distanceToConstellation(x, y) {
    let minDist = Infinity;
    this.stars.forEach((star) => {
      const d = Math.hypot(star.x - x, star.y - y);
      minDist = Math.min(minDist, d);
    });
    return minDist;
  }

  /**
   * Activate constellation glow
   */
  activateConstellation() {
    this.constellation.isGlowing = true;
    setTimeout(() => {
      this.constellation.isGlowing = false;
    }, 3000);
  }

  /**
   * Draw constellation
   */
  draw() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);

    // Update glow
    if (this.constellation.isGlowing) {
      this.constellation.glowAmount = Math.min(1, this.constellation.glowAmount + 0.1);
    } else {
      this.constellation.glowAmount = Math.max(0, this.constellation.glowAmount - 0.05);
    }

    // Draw lines
    this.ctx.strokeStyle = `rgba(255, 142, 203, ${0.3 + this.constellation.glowAmount * 0.4})`;
    this.ctx.lineWidth = 2 + this.constellation.glowAmount * 3;
    this.ctx.beginPath();

    this.stars.forEach((star, i) => {
      if (i === 0) {
        this.ctx.moveTo(star.x, star.y);
      } else {
        this.ctx.lineTo(star.x, star.y);
      }
    });

    this.ctx.closePath();
    this.ctx.stroke();

    // Draw stars
    this.stars.forEach((star) => {
      const baseRadius = 4;
      const radius = baseRadius + this.constellation.glowAmount * 4;

      this.ctx.fillStyle = `rgba(255, 182, 208, ${0.8 + this.constellation.glowAmount * 0.2})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Glow
      if (this.constellation.glowAmount > 0) {
        this.ctx.shadowColor = "rgba(255, 142, 203, 0.8)";
        this.ctx.shadowBlur = 15 * this.constellation.glowAmount;
      }
    });

    this.ctx.shadowColor = "transparent";
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Handle resize
   */
  handleResize() {
    const { canvas, ctx } = createHighDPICanvas(
      window.innerWidth,
      window.innerHeight
    );

    canvas.style.cssText = this.canvas.style.cssText;
    document.body.replaceChild(canvas, this.canvas);

    this.canvas = canvas;
    this.ctx = ctx;
    this.generateConstellation();
  }
}

export function initLoveConstellation() {
  const constellation = new LoveConstellation();
  constellation.init();
  return constellation;
}
