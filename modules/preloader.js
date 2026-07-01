// Enhanced Cinematic Preloader with GSAP
import { CONFIG } from "./config.js";

export class CinematicPreloader {
  constructor() {
    this.preloader = document.querySelector(".preloader");
    this.heart = document.querySelector(".preloader-heart");
    this.quote = document.querySelector(".preloader-quote");
    this.bar = document.querySelector(".preloader-bar span");
    this.particles = document.querySelector(".preloader-particles");
  }

  /**
   * Initialize GSAP preloader animations
   */
  async init() {
    // Check if GSAP is available
    if (typeof gsap === "undefined") {
      console.warn("GSAP not loaded, using CSS animations");
      this.startFallback();
      return;
    }

    this.createParticles();
    this.animatePreloader();
  }

  /**
   * Create animated particles for preloader
   */
  createParticles() {
    const particleEls = this.particles.querySelectorAll("span");
    
    gsap.to(particleEls, {
      duration: 2,
      x: () => gsap.utils.random(-80, 80),
      y: () => gsap.utils.random(-130, -80),
      opacity: 0,
      stagger: {
        each: 0.1,
        repeat: -1,
      },
      ease: "power1.out",
    });
  }

  /**
   * Animate preloader sequence
   */
  animatePreloader() {
    const timeline = gsap.timeline();

    // Heart beat animation
    timeline.to(
      this.heart,
      {
        duration: 1.2,
        repeat: -1,
        scale: (i) => 1 + Math.sin(i * Math.PI * 2) * 0.08,
        ease: "sine.inOut",
      },
      0
    );

    // Quote fade in/out
    timeline.to(
      this.quote,
      {
        opacity: 1,
        duration: 0.8,
      },
      0.3
    );

    timeline.to(
      this.quote,
      {
        opacity: 0.6,
        duration: 0.8,
      },
      1.6
    );

    // Progress bar animation
    timeline.to(
      this.bar,
      {
        duration: 2,
        x: 250,
        ease: "power1.inOut",
      },
      0
    );

    // Hide preloader after duration
    setTimeout(() => {
      gsap.to(this.preloader, {
        duration: 0.75,
        opacity: 0,
        visibility: "hidden",
        ease: "power2.inOut",
        onComplete: () => {
          this.preloader.classList.add("is-hidden");
        },
      });
    }, CONFIG.PRELOADER_DURATION);
  }

  /**
   * Fallback for when GSAP is not available
   */
  startFallback() {
    setTimeout(() => {
      this.preloader.classList.add("is-hidden");
    }, CONFIG.PRELOADER_DURATION);
  }
}

export async function initPreloader() {
  const preloader = new CinematicPreloader();
  await preloader.init();
}
