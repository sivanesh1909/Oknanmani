// Dynamic Aurora Sky
import { CONFIG, createHighDPICanvas, perlinNoise } from "./utils.js";

export class AuroraSky {
  constructor() {
    this.container = document.body;
    this.canvas = null;
    this.ctx = null;
    this.time = 0;
    this.animationId = null;
    this.isEnabled = CONFIG.ENABLE_AURORA;
  }

  /**
   * Initialize aurora sky effect
   */
  init() {
    if (!this.isEnabled) return;

    this.createCanvas();
    this.animate();
  }

  /**
   * Create canvas element for aurora
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
      z-index: 0;
      pointer-events: none;
      mix-blend-mode: screen;
      opacity: 0.6;
    `;

    this.container.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = ctx;

    // Handle resize
    window.addEventListener("resize", () => this.handleResize());
  }

  /**
   * Handle window resize
   */
  handleResize() {
    const { canvas, ctx } = createHighDPICanvas(
      window.innerWidth,
      window.innerHeight
    );

    canvas.style.cssText = this.canvas.style.cssText;
    this.container.replaceChild(canvas, this.canvas);

    this.canvas = canvas;
    this.ctx = ctx;
  }

  /**
   * Animate aurora using noise and gradients
   */
  animate = () => {
    const { width, height } = this.canvas;
    this.time += CONFIG.AURORA_SPEED;

    // Clear canvas
    this.ctx.fillStyle = "rgba(9, 3, 13, 0)";
    this.ctx.fillRect(0, 0, width, height);

    // Draw multiple aurora waves
    for (let i = 0; i < 4; i++) {
      this.drawAuroraWave(
        i,
        width,
        height,
        this.time + i * 0.5,
        CONFIG.AURORA_COLORS[i]
      );
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  /**
   * Draw a single aurora wave
   */
  drawAuroraWave(index, width, height, time, color) {
    const amplitude = 60 + index * 20;
    const frequency = 0.002 + index * 0.0005;
    const yOffset = height * (0.3 + index * 0.15);

    const gradient = this.ctx.createLinearGradient(0, 0, 0, height);

    // Create HSL gradient
    const h = color.h;
    const s = color.s;
    const l = color.l;

    gradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, 0)`);
    gradient.addColorStop(0.5, `hsla(${h}, ${s}%, ${l}%, 0.3)`);
    gradient.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`);

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();

    // Draw wave with noise
    for (let x = 0; x < width; x += 2) {
      const noise = perlinNoise(x * frequency, time);
      const y =
        yOffset +
        Math.sin(x * frequency + time) * amplitude +
        noise * amplitude * 0.5;

      if (x === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.lineTo(width, height);
    this.ctx.lineTo(0, height);
    this.ctx.closePath();
    this.ctx.fill();
  }

  /**
   * Destroy aurora
   */
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      this.canvas.remove();
    }
  }
}

export function initAuroraSky() {
  const aurora = new AuroraSky();
  aurora.init();
  return aurora;
}
