// Secret Message Unlock (LOVE keyboard)
export class SecretMessage {
  constructor() {
    this.sequence = "LOVE";
    this.currentInput = "";
    this.secretRevealed = false;
  }

  /**
   * Initialize secret message detector
   */
  init() {
    document.addEventListener("keydown", (e) => this.handleKeyPress(e), false);
  }

  /**
   * Handle key press
   */
  handleKeyPress(e) {
    const key = e.key.toUpperCase();

    // Only track letters
    if (!/^[A-Z]$/.test(key)) {
      this.currentInput = "";
      return;
    }

    this.currentInput += key;

    // Keep only last 4 characters
    if (this.currentInput.length > this.sequence.length) {
      this.currentInput = this.currentInput.slice(-this.sequence.length);
    }

    // Check if sequence matches
    if (this.currentInput === this.sequence) {
      this.revealSecret();
      this.currentInput = "";
    }
  }

  /**
   * Reveal secret message
   */
  revealSecret() {
    if (this.secretRevealed) return;
    this.secretRevealed = true;

    const secretSection = document.createElement("div");
    secretSection.className = "secret-message-section";
    secretSection.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      display: grid;
      place-items: center;
      z-index: 2000;
      animation: fadeIn 0.5s ease-out;
    `;

    secretSection.innerHTML = `
      <div style="
        text-align: center;
        padding: 2rem;
        max-width: 600px;
        animation: slideDown 0.6s ease-out;
      ">
        <p style="font-size: 3rem; margin-bottom: 1rem;">🔓</p>
        <h2 style="font-size: 2rem; margin: 0 0 1rem; color: #ff8ecb;">
          You Found The Secret! 💕
        </h2>
        <p style="color: #fff7fe; font-size: 1.1rem; line-height: 1.6; margin: 0;">
          🎁 This was just for you, my love.<br>
          Thank you for exploring every corner of my heart.<br>
          I love you more than words can say. ❤️
        </p>
      </div>
    `;

    document.body.appendChild(secretSection);

    // Click to close
    secretSection.addEventListener("click", () => {
      secretSection.style.animation = "fadeOut 0.5s ease-out forwards";
      setTimeout(() => secretSection.remove(), 500);
      this.secretRevealed = false;
    });
  }
}

export function initSecretMessage() {
  const secret = new SecretMessage();
  secret.init();
  return secret;
}
