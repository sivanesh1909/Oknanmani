// Day to Night Cycle
import { CONFIG, getTimeOfDay } from "./utils.js";

export class DayToNightCycle {
  constructor() {
    this.pageContent = document.querySelector(".page-content");
    this.currentPhase = 0;
  }

  /**
   * Initialize day-to-night cycle
   */
  init() {
    this.updateCycle();
    setInterval(() => this.updateCycle(), 1000);
  }

  /**
   * Update cycle based on time
   */
  updateCycle() {
    const timeOfDay = getTimeOfDay();

    // 0 = midnight (dark), 0.25 = sunrise, 0.5 = noon (light), 0.75 = sunset
    let colors = {
      start: "#09030d",
      end: "#1a0d22",
      overlay: "rgba(255, 142, 203, 0)",
    };

    if (timeOfDay < 0.25) {
      // Night
      colors = {
        start: "#09030d",
        end: "#1a0d22",
        overlay: "rgba(0, 20, 60, 0.1)",
      };
    } else if (timeOfDay < 0.35) {
      // Sunrise
      const progress = (timeOfDay - 0.25) / 0.1;
      colors = this.lerp(
        { start: "#09030d", end: "#1a0d22", overlay: "rgba(0, 20, 60, 0.1)" },
        { start: "#1a1a0d", end: "#2d1a1a", overlay: "rgba(255, 120, 60, 0.05)" },
        progress
      );
    } else if (timeOfDay < 0.5) {
      // Morning to noon
      const progress = (timeOfDay - 0.35) / 0.15;
      colors = this.lerp(
        { start: "#1a1a0d", end: "#2d1a1a", overlay: "rgba(255, 120, 60, 0.05)" },
        { start: "#2a1a2a", end: "#3a2a3a", overlay: "rgba(255, 180, 100, 0.02)" },
        progress
      );
    } else if (timeOfDay < 0.65) {
      // Noon
      colors = {
        start: "#2a1a2a",
        end: "#3a2a3a",
        overlay: "rgba(255, 200, 150, 0.01)",
      };
    } else if (timeOfDay < 0.75) {
      // Afternoon to sunset
      const progress = (timeOfDay - 0.65) / 0.1;
      colors = this.lerp(
        { start: "#2a1a2a", end: "#3a2a3a", overlay: "rgba(255, 200, 150, 0.01)" },
        { start: "#2a1a0d", end: "#3a2a1a", overlay: "rgba(255, 100, 50, 0.08)" },
        progress
      );
    } else if (timeOfDay < 0.85) {
      // Sunset
      const progress = (timeOfDay - 0.75) / 0.1;
      colors = this.lerp(
        { start: "#2a1a0d", end: "#3a2a1a", overlay: "rgba(255, 100, 50, 0.08)" },
        { start: "#1a0a1a", end: "#2a1a2a", overlay: "rgba(60, 20, 100, 0.15)" },
        progress
      );
    } else {
      // Evening to night
      const progress = (timeOfDay - 0.85) / 0.15;
      colors = this.lerp(
        { start: "#1a0a1a", end: "#2a1a2a", overlay: "rgba(60, 20, 100, 0.15)" },
        { start: "#09030d", end: "#1a0d22", overlay: "rgba(0, 20, 60, 0.1)" },
        progress
      );
    }

    // Apply colors to background
    if (this.pageContent) {
      this.pageContent.style.setProperty("--day-color-start", colors.start);
      this.pageContent.style.setProperty("--day-color-end", colors.end);
    }

    this.currentPhase = timeOfDay;
  }

  /**
   * Lerp between two color configs
   */
  lerp(a, b, t) {
    return {
      start: this.lerpColor(a.start, b.start, t),
      end: this.lerpColor(a.end, b.end, t),
      overlay: this.lerpColor(a.overlay, b.overlay, t),
    };
  }

  /**
   * Lerp between two hex colors
   */
  lerpColor(colorA, colorB, t) {
    // For simplicity, return colorB at midpoint and interpolate
    return t < 0.5 ? colorA : colorB;
  }
}

export function initDayToNightCycle() {
  const cycle = new DayToNightCycle();
  cycle.init();
  return cycle;
}
