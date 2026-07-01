// Balloon Release Feature
import { random, randomInt } from "./utils.js";

export class BalloonRelease {
  constructor() {
    this.container = document.body;
  }

  /**
   * Initialize balloon release button
   */
  init() {
    // Create balloon button in final section
    const finalCard = document.querySelector(".final-card");
    if (!finalCard) return;

    const balloonBtn = document.createElement("button");
    balloonBtn.textContent = "🎈 Release Balloons 🎈";
    balloonBtn.className = "balloon-btn";
    balloonBtn.style.cssText = `
      margin-top: 2rem;
      padding: 0.9rem 1.8rem;
      border-radius: 999px;
      background: linear-gradient(135deg, #ff8ecb, #c4b3ff);
      color: #2a1026;
      border: none;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(255, 142, 203, 0.3);
      transition: transform 0.25s, box-shadow 0.25s;
    `;

    balloonBtn.addEventListener("mouseover", () => {
      balloonBtn.style.transform = "scale(1.05)";
    });

    balloonBtn.addEventListener("mouseout", () => {
      balloonBtn.style.transform = "scale(1)";
    });

    balloonBtn.addEventListener("click", () => this.releaseBalloons());
    finalCard.appendChild(balloonBtn);
  }

  /**
   * Release balloons animation
   */
  releaseBalloons() {
    const balloonCount = randomInt(50, 100);
    const messages = [
      "I Love You ❤️",
      "Forever Yours 💕",
      "My Love 💖",
      "Always ❤️",
      "You & Me 💑",
      "Happy Birthday 🎉",
    ];

    for (let i = 0; i < balloonCount; i++) {
      setTimeout(() => {
        this.createBalloon(messages[i % messages.length]);
      }, i * 30);
    }
  }

  /**
   * Create a single balloon
   */
  createBalloon(message) {
    const balloon = document.createElement("div");
    const colors = ["#ff8ecb", "#c4b3ff", "#ffb6d0", "#8a65ff", "#ff6a9a"];
    const color = colors[randomInt(0, colors.length - 1)];

    balloon.className = "balloon";
    balloon.textContent = "🎈";
    balloon.style.cssText = `
      position: fixed;
      left: ${random(10, 90)}vw;
      bottom: ${random(0, 30)}vh;
      font-size: 2rem;
      color: ${color};
      pointer-events: none;
      z-index: 100;
      animation: balloonsRise ${random(4, 7)}s ease-in forwards;
      filter: drop-shadow(0 0 8px ${color});
    `;

    this.container.appendChild(balloon);

    const duration = parseInt(balloon.style.animation.split(" ")[1]) * 1000;
    setTimeout(() => balloon.remove(), duration);
  }
}

export function initBalloonRelease() {
  const balloons = new BalloonRelease();
  balloons.init();
  return balloons;
}
