// Grand Finale
import { CONFIG } from "./config.js";
import { random } from "./utils.js";

export class GrandFinale {
  constructor() {
    this.container = document.body;
    this.finaleTriggered = false;
  }

  /**
   * Initialize grand finale trigger
   */
  init() {
    // Monitor scroll position to trigger finale at footer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.finaleTriggered) {
            this.trigger();
          }
        });
      },
      { threshold: 0.5 }
    );

    const finalSection = document.querySelector(".final-section");
    if (finalSection) {
      observer.observe(finalSection);
    }
  }

  /**
   * Trigger grand finale
   */
  trigger() {
    this.finaleTriggered = true;

    // Check if GSAP is available
    if (typeof gsap !== "undefined") {
      this.triggerWithGSAP();
    } else {
      this.triggerFallback();
    }
  }

  /**
   * Trigger with GSAP
   */
  triggerWithGSAP() {
    const timeline = gsap.timeline();

    // Darken screen
    const screen = document.createElement("div");
    screen.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0);
      z-index: 1500;
      pointer-events: none;
    `;
    this.container.appendChild(screen);

    timeline.to(
      screen,
      {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        duration: 1,
      },
      0
    );

    // Create finale text
    const finaleText = document.createElement("div");
    finaleText.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 1501;
      color: #fff7fe;
      font-size: 2.5rem;
      font-weight: 700;
      max-width: 90vw;
      line-height: 1.6;
    `;

    this.container.appendChild(finaleText);

    // Animate finale sequence
    timeline.to(
      finaleText,
      {
        opacity: 1,
        duration: 1,
        onStart: () => {
          finaleText.textContent = "Screen darkens...";
          finaleText.style.opacity = "0";
        },
      },
      0.5
    );

    timeline.to(
      finaleText,
      {
        opacity: 0,
        duration: 1,
      },
      2
    );

    timeline.call(() => {
      finaleText.textContent = "Stars brighten...";
      finaleText.style.opacity = "1";
    }, [], 2.2);

    timeline.to(
      finaleText,
      {
        opacity: 0,
        duration: 1,
      },
      3.5
    );

    timeline.call(() => {
      finaleText.textContent = "Aurora expands...";
      finaleText.style.opacity = "1";
      finaleText.style.fontSize = "2rem";
    }, [], 3.7);

    timeline.to(
      finaleText,
      {
        opacity: 0,
        duration: 1,
      },
      5);

    // Final message
    timeline.call(() => {
      finaleText.innerHTML = `
        <p style="font-size: 1.8rem; margin: 0 0 1rem;">✨</p>
        <p style="margin: 0; font-size: 1.5rem;">You are the best thing that has</p>
        <p style="margin: 0; font-size: 1.5rem;">ever happened to me.</p>
      `;
      finaleText.style.opacity = "1";
    }, [], 5.2);

    timeline.to(
      finaleText,
      {
        opacity: 0,
        duration: 1,
      },
      7
    );

    timeline.call(() => {
      finaleText.innerHTML = `
        <p style="font-size: 3rem; margin: 0;">❤️</p>
        <p style="margin: 1rem 0 0; font-size: 2.2rem;">I Love You Forever</p>
        <p style="margin: 0.5rem 0 0; font-size: 2rem;">Kanmani</p>
        <p style="margin: 1rem 0 0; font-size: 1.8rem;">❤️</p>
      `;
      finaleText.style.opacity = "1";
    }, [], 7.2);

    // Create heart burst
    timeline.call(() => {
      this.createHeartBurst();
    }, [], 9);

    // Fade to hearts
    timeline.to(
      screen,
      {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        duration: 2,
      },
      9
    );
  }

  /**
   * Create heart burst effect
   */
  createHeartBurst() {
    for (let i = 0; i < 100; i++) {
      const heart = document.createElement("div");
      heart.textContent = "💖";
      heart.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        font-size: ${random(1, 4)}rem;
        pointer-events: none;
        z-index: 1500;
        animation: heartBurst ${random(2, 4)}s ease-out forwards;
        --tx: ${(Math.random() - 0.5) * 600}px;
        --ty: ${(Math.random() - 0.5) * 600}px;
      `;

      this.container.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }
  }

  /**
   * Fallback without GSAP
   */
  triggerFallback() {
    const screen = document.createElement("div");
    screen.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1500;
      pointer-events: none;
    `;

    const finaleText = document.createElement("div");
    finaleText.innerHTML = `
      <p style="font-size: 3rem; margin: 0;">❤️</p>
      <p style="margin: 1rem 0 0; font-size: 2.2rem; color: #fff7fe;">I Love You Forever</p>
      <p style="margin: 0.5rem 0 0; font-size: 2rem; color: #fff7fe;">Kanmani</p>
      <p style="margin: 1rem 0 0; font-size: 1.8rem;">❤️</p>
    `;
    finaleText.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 1501;
      animation: fadeInOut 4s ease-in-out;
    `;

    this.container.appendChild(screen);
    this.container.appendChild(finaleText);

    this.createHeartBurst();
  }
}

export function initGrandFinale() {
  const finale = new GrandFinale();
  finale.init();
  return finale;
}
