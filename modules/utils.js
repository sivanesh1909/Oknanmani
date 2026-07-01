// Utility functions for animations and effects

/**
 * Create particles with various properties
 * @param {HTMLElement} container - Target container
 * @param {number} count - Number of particles
 * @param {Object} options - Particle options
 */
export function createParticles(container, count, options = {}) {
  const {
    emoji = "✨",
    duration = 3,
    className = "particle",
    minSize = 8,
    maxSize = 16,
    colors = [],
  } = options;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = className;
    particle.textContent = emoji;

    const size = Math.random() * (maxSize - minSize) + minSize;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      font-size: ${size}px;
      pointer-events: none;
      z-index: 9998;
      ${color ? `color: ${color};` : ""}
    `;

    container.appendChild(particle);
  }
}

/**
 * Get random value between min and max
 */
export function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Get random integer between min and max
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Throttle function execution
 */
export function throttle(func, delay) {
  let timeoutId = null;
  let lastRan = 0;

  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (Date.now() - lastRan >= delay) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
}

/**
 * Debounce function execution
 */
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Linear interpolation
 */
export function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Ease out cubic
 */
export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Ease in out cubic
 */
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Create a 2D noise-like value using sine waves
 */
export function perlinNoise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * Get current time of day (0 = midnight, 0.5 = noon, 1 = midnight)
 */
export function getTimeOfDay() {
  const now = new Date();
  const hours = now.getHours() + now.getMinutes() / 60;
  return (hours % 24) / 24;
}

/**
 * Get moon phase (0-1, 0 = new moon, 0.5 = full moon)
 */
export function getMoonPhase(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Known new moon: January 6, 2000
  const knownNewMoon = new Date(2000, 0, 6);
  const lunarCycle = 29.53058867;

  const diff = Math.abs((date - knownNewMoon) / (1000 * 60 * 60 * 24));
  return (diff % lunarCycle) / lunarCycle;
}

/**
 * Check if device supports WebGL
 */
export function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

/**
 * Request animation frame with fallback
 */
export function requestAnimFrame(callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  ).call(window, callback);
}

/**
 * Create a canvas element with high DPI support
 */
export function createHighDPICanvas(width, height) {
  const ratio = window.devicePixelRatio || 1;
  const canvas = document.createElement("canvas");
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);

  return { canvas, ctx };
}

/**
 * Format number with leading zeros
 */
export function padZero(num, digits = 2) {
  return String(num).padStart(digits, "0");
}

/**
 * Get distance between two points
 */
export function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Get angle between two points in radians
 */
export function angle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
}
