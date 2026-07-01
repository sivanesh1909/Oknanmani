// 3D Parallax System
import { CONFIG, throttle, isInViewport } from "./utils.js";

export class Parallax3D {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.elements = [];
    this.isEnabled = CONFIG.ENABLE_PARALLAX;
  }

  /**
   * Initialize parallax effect on elements
   */
  init() {
    if (!this.isEnabled) return;

    // Select parallax elements
    this.elements = document.querySelectorAll(
      ".glass-card, .hero-heart, .hero-content, h2, img, .gallery-card, .timeline-card, .reason-card, button"
    );

    // Setup event listeners
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e), false);

    // Animate parallax
    this.animate();
  }

  /**
   * Handle mouse movement
   */
  handleMouseMove(e) {
    this.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetY = (e.clientY / window.innerHeight) * 2 - 1;
  }

  /**
   * Smooth parallax animation loop
   */
  animate() {
    // Smooth interpolation
    this.mouseX += (this.targetX - this.mouseX) * CONFIG.PARALLAX_SMOOTH;
    this.mouseY += (this.targetY - this.mouseY) * CONFIG.PARALLAX_SMOOTH;

    this.elements.forEach((element, index) => {
      const depth = (index % 5) * 0.2; // Different depths
      const moveX = this.mouseX * depth * 15 * CONFIG.PARALLAX_STRENGTH;
      const moveY = this.mouseY * depth * 15 * CONFIG.PARALLAX_STRENGTH;

      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) perspective(1000px) rotateX(${moveY * 0.5}deg) rotateY(${moveX * 0.5}deg)`;
    });

    requestAnimationFrame(() => this.animate());
  }
}

export function initParallax() {
  const parallax = new Parallax3D();
  parallax.init();
  return parallax;
}
