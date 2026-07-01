// Floating Love Quotes
import { LOVE_QUOTES, CONFIG } from "./config.js";

export class FloatingQuotes {
  constructor() {
    this.container = document.body;
    this.quoteInterval = null;
  }

  /**
   * Initialize floating quotes
   */
  init() {
    this.startQuoteLoop();
  }

  /**
   * Start quote display loop
   */
  startQuoteLoop() {
    this.quoteInterval = setInterval(() => {
      this.displayQuote();
    }, CONFIG.QUOTE_INTERVAL + Math.random() * 10000);

    // Display first quote quickly
    setTimeout(() => this.displayQuote(), 5000);
  }

  /**
   * Display a random quote
   */
  displayQuote() {
    const quote = LOVE_QUOTES[Math.floor(Math.random() * LOVE_QUOTES.length)];
    const quoteEl = document.createElement("div");

    quoteEl.className = "floating-quote";
    quoteEl.textContent = quote;
    quoteEl.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 60}vh;
      max-width: 300px;
      padding: 1rem;
      background: rgba(255, 142, 203, 0.15);
      border: 1px solid rgba(255, 142, 203, 0.3);
      border-radius: 12px;
      color: #fff7fe;
      font-size: 0.95rem;
      text-align: center;
      pointer-events: none;
      z-index: 100;
      backdrop-filter: blur(12px);
      animation: quoteFloat 6s ease-in-out forwards;
      font-style: italic;
    `;

    this.container.appendChild(quoteEl);

    // Remove after animation
    setTimeout(() => {
      quoteEl.remove();
    }, CONFIG.QUOTE_DISPLAY_TIME);
  }

  /**
   * Stop quote display
   */
  stop() {
    if (this.quoteInterval) {
      clearInterval(this.quoteInterval);
    }
  }
}

export function initFloatingQuotes() {
  const quotes = new FloatingQuotes();
  quotes.init();
  return quotes;
}
