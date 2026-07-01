// Memory Popups - Floating Notifications
import { MEMORY_POPUPS } from "./config.js";
import { random } from "./utils.js";

export class MemoryPopups {
  constructor() {
    this.container = document.body;
    this.interval = null;
  }

  /**
   * Initialize memory popups
   */
  init() {
    this.startPopupLoop();
  }

  /**
   * Start popup display loop
   */
  startPopupLoop() {
    // Show first popup after 8 seconds
    setTimeout(() => this.displayMemory(), 8000);

    // Show subsequent popups every 30-50 seconds
    this.interval = setInterval(() => {
      this.displayMemory();
    }, 30000 + Math.random() * 20000);
  }

  /**
   * Display a memory popup
   */
  displayMemory() {
    const memory = MEMORY_POPUPS[Math.floor(Math.random() * MEMORY_POPUPS.length)];
    const popup = document.createElement("div");

    const x = Math.random() * 80 + 10; // 10-90% from left
    const y = Math.random() * 60 + 20; // 20-80% from top

    popup.className = "memory-popup";
    popup.textContent = memory;
    popup.style.cssText = `
      position: fixed;
      left: ${x}%;
      top: ${y}%;
      background: rgba(255, 182, 208, 0.12);
      border: 1px solid rgba(255, 142, 203, 0.4);
      border-radius: 16px;
      padding: 1rem 1.2rem;
      color: #fff7fe;
      font-size: 0.9rem;
      max-width: 280px;
      pointer-events: none;
      z-index: 99;
      backdrop-filter: blur(12px);
      box-shadow: 0 10px 40px rgba(255, 142, 203, 0.1);
      animation: memoryFade 7s ease-in-out forwards;
      transform: translate(-50%, -50%);
    `;

    this.container.appendChild(popup);

    // Remove after animation
    setTimeout(() => {
      popup.remove();
    }, 7000);
  }

  /**
   * Stop popup display
   */
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

export function initMemoryPopups() {
  const popups = new MemoryPopups();
  popups.init();
  return popups;
}
