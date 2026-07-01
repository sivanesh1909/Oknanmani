// Shooting Stars Effect
import { CONFIG, random, createHighDPICanvas } from "./utils.js";

export class ShootingStars {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.stars = [];
    this.animationId = null;
    this.isEnabled = CONFIG.ENABLE_STARS;
  }

  /**
   * Initialize shooting stars
   */
  init() {
    if (!this.isEnabled) return;

    this.createCanvas();
    this.spawnStars();
    this.animate();
  }

  /**
   * Create canvas for stars
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
      z-index: 5;
      pointer-events: none;
    `;

    document.body.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = ctx;

    window.addEventListener("resize", () => this.handleResize());
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
  }

  /**
   * Spawn a new shooting star
   */
  spawnStar() {
    const star = {
      x: Math.random() * this.canvas.width,
      y: Math.random() * (this.canvas.height * 0.6),
      speedX: random(2, 8),
      speedY: random(0.5, 3),
      length: random(50, 150),
      width: random(1, 3),
      opacity: 1,
      age: 0,
      lifetime: random(1000, 2000),
    };

    this.stars.push(star);
  }

  /**
   * Spawn initial stars
   */
  spawnStars() {
    for (let i = 0; i < CONFIG.SHOOTING_STAR_COUNT; i++) {
      setTimeout(() => this.spawnStar(), i * 1000);
    }

    // Spawn new stars at intervals
    setInterval(() => this.spawnStar(), CONFIG.SHOOTING_STAR_INTERVAL);
  }

  /**
   * Animate shooting stars
   */
  animate = () => {
    const { width, height } = this.canvas;

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    // Update and draw stars
    for (let i = this.stars.length - 1; i >= 0; i--) {
      const star = this.stars[i];

      star.x += star.speedX;
      star.y += star.speedY;
      star.age += 16; // Approximate frame time
      star.opacity = 1 - star.age / star.lifetime;

      if (star.opacity <= 0 || star.x > width || star.y > height) {
        this.stars.splice(i, 1);
        continue;
      }

      // Draw shooting star trail
      this.drawStar(star);
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  /**
   * Draw a shooting star with glow
   */
  drawStar(star) {
    // Main line
    this.ctx.strokeStyle = `rgba(255, 182, 208, ${star.opacity})`;
    this.ctx.lineWidth = star.width;
    this.ctx.lineCap = "round";

    this.ctx.beginPath();
    this.ctx.moveTo(star.x, star.y);
    this.ctx.lineTo(star.x - star.speedX * star.length, star.y - star.speedY * star.length);
    this.ctx.stroke();

    // Glow
    this.ctx.strokeStyle = `rgba(255, 142, 203, ${star.opacity * 0.5})`;
    this.ctx.lineWidth = star.width * 3;
    this.ctx.beginPath();
    this.ctx.moveTo(star.x, star.y);
    this.ctx.lineTo(star.x - star.speedX * star.length, star.y - star.speedY * star.length);
    this.ctx.stroke();

    // Head glow
    this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(star.x, star.y, star.width * 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /**
   * Destroy shooting stars
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

export function initShootingStars() {
  const stars = new ShootingStars();
  stars.init();
  return stars;
}
