window.__authLoaded = true;

const authQuestions = [
  {
    prompt: "Who am I to you?",
    answer: ["my man and father"]
  },
  {
    prompt: "What is my nickname for you?",
    answer: ["kanmani"]
  },
  {
    prompt: "What was the colour of my dress on our first date?",
    answer: ["blue"]
  },
  {
    prompt: "What was the cost of the first flower I bought for you?",
    answer: ["70 rs", "70rs", "70"]
  },
  {
    prompt: "On which date did you first cook for me?",
    answer: ["may 2 2026", "2 may 2026", "may 2, 2026", "2 may, 2026"]
  }
];

const authQuotes = [
  "You are my favorite place.",
  "My forever begins with you.",
  "My heart remembers everything.",
  "Our memories are priceless.",
  "Every beat of mine belongs to you.",
  "Your love is my sweetest melody.",
  "You make my whole world glow.",
  "In your eyes I find home.",
  "Even silence feels tender with you.",
  "My heart writes your name in starlight.",
  "Your smile turns ordinary days magical.",
  "Our love feels like poetry in motion.",
  "I would choose you in every lifetime.",
  "You are the dream I never want to wake from.",
  "My favorite memory is the one with you.",
  "Your laugh is the warmest song I know.",
  "Love grows softer when it is yours.",
  "You are the light in my quietest nights.",
  "My heart beats in your rhythm.",
  "Every moment with you is a treasure.",
  "The sweetest chapter of my life is us.",
  "You make forever feel close.",
  "My heart is a garden, and you are its bloom.",
  "Our story shines brighter than stars.",
  "I still choose you in each sunrise.",
  "All my sweetest dreams wear your name.",
  "Your love is the calm after the storm.",
  "My heart feels safest in your hands.",
  "You make tenderness feel limitless.",
  "I carry your love like a secret light.",
  "All my little joys are wrapped in you.",
  "The world feels softer when I think of you.",
  "My heart still finds you everywhere.",
  "You are the color of my favorite memories.",
  "Love looks beautiful when it is ours.",
  "You are my sweetest prayer answered.",
  "My soul knows your name by heart.",
  "Even time pauses when I think of you.",
  "Every heartbeat says your name.",
  "You are the magic I never want to lose.",
  "My heart keeps choosing you, always.",
  "Your love has painted my life gold.",
  "You are the most beautiful chapter of me.",
  "My sweetest forever is with you.",
  "The stars seem kinder when you are near.",
  "You make my heart feel brave and soft.",
  "Our love writes itself in moonlight.",
  "I would cross every dream to reach you.",
  "You are the home my heart returns to.",
  "Your love is the gentlest miracle.",
  "My heart still blushes when I say your name.",
  "You are the rarest kind of beautiful.",
  "The best part of me is the part that loves you.",
  "You are my favorite kind of forever.",
  "My heart keeps your name like a secret treasure."
];

const authScreen = document.querySelector(".auth-screen");
const authCard = document.querySelector(".auth-card");
const introView = document.querySelector(".auth-intro");
const questionView = document.querySelector(".auth-question-shell");
const successView = document.querySelector(".auth-success");
const beginBtn = document.querySelector(".auth-begin-btn");
const submitBtn = document.querySelector(".auth-submit-btn");
const nextBtn = document.querySelector(".auth-next-btn");
const heartLocks = Array.from(document.querySelectorAll(".auth-heart-lock"));
const heartLock = heartLocks.find((element) => element.getAttribute("role") === "button") || heartLocks[0];
const input = document.querySelector(".auth-input");
const progressLabel = document.querySelector(".auth-progress span");
const questionPrompt = document.querySelector(".auth-question");
const statusEl = document.querySelector(".auth-status");
const badgeEl = document.querySelector(".auth-badge");
const quoteLayer = document.querySelector(".auth-quote-layer");
const canvas = document.querySelector(".auth-canvas");
const ctx = canvas?.getContext("2d");

let currentQuestionIndex = 0;
let correctAnswers = 0;
let hasMistake = false;
let isLocked = true;
let quoteTimer;
let rafId;

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function animateCardIn() {
  if (window.gsap) {
    window.gsap.from(".auth-card", { duration: 1.1, y: 32, opacity: 0, ease: "power3.out" });
    window.gsap.from(".auth-heart-lock", { duration: 1.2, scale: 0.72, opacity: 0, ease: "back.out(1.7)" });
    window.gsap.from(".auth-title, .auth-copy, .auth-begin-btn", { duration: 1.1, y: 18, opacity: 0, stagger: 0.12, ease: "power3.out" });
  }
}

function showIntro() {
  introView.classList.add("is-visible");
  questionView.classList.remove("is-visible");
  successView.classList.remove("is-visible");
  statusEl.className = "auth-status";
  statusEl.textContent = "";
  input.value = "";
  if (window.gsap) {
    window.gsap.fromTo(".auth-intro", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
  }
}

function renderQuestion() {
  const question = authQuestions[currentQuestionIndex];
  introView.classList.remove("is-visible");
  questionView.classList.add("is-visible");
  successView.classList.remove("is-visible");
  progressLabel.textContent = `${currentQuestionIndex + 1} of ${authQuestions.length}`;
  questionPrompt.textContent = question.prompt;
  input.value = "";
  input.focus();
  statusEl.className = "auth-status";
  statusEl.textContent = "";
  if (window.gsap) {
    window.gsap.fromTo(".auth-question-shell", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
  }
}

function createQuoteBubbles() {
  if (!quoteLayer) {
    return;
  }

  quoteLayer.innerHTML = "";
  const quotes = [...authQuotes].sort(() => 0.5 - Math.random()).slice(0, 18);
  quotes.forEach((quote, index) => {
    const el = document.createElement("div");
    el.className = "auth-quote";
    el.textContent = quote;
    el.style.left = `${8 + Math.random() * 84}%`;
    el.style.top = `${14 + Math.random() * 70}%`;
    el.style.animationDuration = `${10 + index * 0.4}s`;
    el.style.animationDelay = `${index * 0.15}s`;
    quoteLayer.appendChild(el);
  });
}

function createSparkleBurst(x, y, color) {
  for (let i = 0; i < 18; i += 1) {
    const spark = document.createElement("span");
    spark.className = "auth-spark";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.color = color;
    spark.style.setProperty("--dx", `${(Math.random() - 0.5) * 140}px`);
    spark.style.setProperty("--dy", `${(Math.random() - 0.5) * 140}px`);
    authCard.appendChild(spark);
    setTimeout(() => spark.remove(), 1100);
  }
}

function createFloatingParticles() {
  if (!authCard) {
    return;
  }
  for (let i = 0; i < 16; i += 1) {
    const particle = document.createElement("span");
    particle.className = "auth-particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.background = ["#ff8ecb", "#f6d0ff", "#fff", "#8a65ff"][Math.floor(Math.random() * 4)];
    particle.style.setProperty("--dx", `${(Math.random() - 0.5) * 120}px`);
    particle.style.setProperty("--dy", `${(Math.random() - 0.5) * 120}px`);
    authCard.appendChild(particle);
    setTimeout(() => particle.remove(), 900);
  }
}

function handleCorrectAnswer() {
  correctAnswers += 1;
  heartLock.classList.remove("is-wrong");
  heartLock.classList.add("is-correct");
  if (window.gsap) {
    window.gsap.to(heartLock, { scale: 1.08, duration: 0.28, yoyo: true, repeat: 1, ease: "power2.inOut" });
  }
  createSparkleBurst(heartLock.offsetLeft + heartLock.offsetWidth / 2, heartLock.offsetTop + heartLock.offsetHeight / 2, "#52f2a6");
  statusEl.className = "auth-status auth-status--correct";
  statusEl.textContent = "Correct ❤️";
  setTimeout(() => {
    heartLock.classList.remove("is-correct");
  }, 900);

  if (currentQuestionIndex === authQuestions.length - 1) {
    unlockAuth();
    return;
  }

  currentQuestionIndex += 1;
  setTimeout(() => renderQuestion(), 700);
}

function handleWrongAnswer() {
  hasMistake = true;
  heartLock.classList.remove("is-correct");
  heartLock.classList.add("is-wrong");
  createSparkleBurst(heartLock.offsetLeft + heartLock.offsetWidth / 2, heartLock.offsetTop + heartLock.offsetHeight / 2, "#ff6b7d");
  statusEl.className = "auth-status auth-status--error";
  statusEl.innerHTML = "Oh no...<br/>That doesn't match my memories.";
  setTimeout(() => heartLock.classList.remove("is-wrong"), 800);
}

function validateAnswer() {
  const value = normalizeAnswer(input.value);
  if (!value) {
    statusEl.className = "auth-status auth-status--error";
    statusEl.textContent = "Tell me what your heart remembers.";
    return;
  }

  const accepted = authQuestions[currentQuestionIndex].answer.some((answer) => normalizeAnswer(answer) === value);
  if (accepted) {
    handleCorrectAnswer();
  } else {
    handleWrongAnswer();
  }
}

function unlockAuth() {
  isLocked = false;
  authScreen.classList.add("is-unlocking");
  heartLock.classList.add("is-unlocked");
  if (window.gsap) {
    window.gsap.to(".auth-card", { scale: 1.02, duration: 0.45, ease: "power2.out" });
    window.gsap.to(".auth-heart-lock", { scale: 1.25, duration: 0.7, ease: "power2.out" });
  }
  statusEl.className = "auth-status auth-status--correct";
  statusEl.textContent = "You found the key to my heart.";
  createFloatingParticles();
  createSparkleBurst(window.innerWidth / 2, window.innerHeight / 2, "#ffd68a");
  setTimeout(() => {
    successView.classList.add("is-visible");
    questionView.classList.remove("is-visible");
    introView.classList.remove("is-visible");
    badgeEl.style.display = hasMistake ? "none" : "inline-flex";
    if (!hasMistake) {
      badgeEl.textContent = "True Soulmate ❤️";
    }
  }, 600);

  setTimeout(() => {
    authScreen.classList.add("is-hidden");
    document.body.classList.remove("auth-active");
    document.querySelector(".page-content").style.opacity = "1";
    document.querySelector(".page-content").style.visibility = "visible";
    document.querySelector(".page-content").style.filter = "none";
    document.querySelector(".music-player").style.opacity = "1";
    document.querySelector(".music-player").style.visibility = "visible";
    document.querySelector(".music-player").style.pointerEvents = "auto";
    document.querySelector(".preloader")?.classList.add("is-hidden");
    const audio = document.getElementById("bg-audio");
    if (audio) {
      audio.volume = 0.35;
      audio.play().catch(() => {});
    }
  }, 2200);
}

function startAuthExperience() {
  createQuoteBubbles();
  showIntro();
  document.body.classList.add("auth-active");
  authScreen.classList.remove("is-hidden");
  window.setTimeout(() => {
    heartLock.focus();
  }, 300);
}

function handleAuthAction(event) {
  if (!isLocked) {
    return;
  }

  const trigger = event.target instanceof Element ? event.target.closest(".auth-heart-lock, .auth-begin-btn, .auth-submit-btn") : null;
  if (!trigger) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  if (trigger.classList.contains("auth-begin-btn") || trigger.classList.contains("auth-heart-lock")) {
    if (introView.classList.contains("is-visible")) {
      renderQuestion();
    } else if (questionView.classList.contains("is-visible")) {
      validateAnswer();
    }
  }

  if (trigger.classList.contains("auth-submit-btn")) {
    validateAnswer();
  }
}

function attachAuthEvents() {
  beginBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    renderQuestion();
  });

  submitBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    validateAnswer();
  });
  nextBtn?.addEventListener("click", () => {
    if (currentQuestionIndex < authQuestions.length - 1) {
      currentQuestionIndex += 1;
      renderQuestion();
    }
  });

  input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      validateAnswer();
    }
  });

  heartLocks.forEach((lock) => {
    lock.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isLocked) {
        if (introView.classList.contains("is-visible")) {
          renderQuestion();
        } else if (questionView.classList.contains("is-visible")) {
          validateAnswer();
        }
      }
    });
  });

  document.addEventListener("click", handleAuthAction, true);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && isLocked && heartLock && document.activeElement === heartLock) {
      event.preventDefault();
      if (introView.classList.contains("is-visible")) {
        renderQuestion();
      } else if (questionView.classList.contains("is-visible")) {
        validateAnswer();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
}

function drawBackground() {
  if (!canvas || !ctx) {
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const width = canvas.width;
  const height = canvas.height;
  const gradient = ctx.createRadialGradient(width * 0.25, height * 0.2, 50, width * 0.25, height * 0.2, width * 0.6);
  gradient.addColorStop(0, "rgba(255, 142, 203, 0.15)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.beginPath();
  ctx.arc(width * 0.8, height * 0.18, 180, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 235, 255, 0.08)";
  ctx.fill();
  rafId = window.requestAnimationFrame(drawBackground);
}

function initAuth() {
  if (!authScreen || window.__authInitialized) {
    return;
  }

  window.__authInitialized = true;
  attachAuthEvents();
  drawBackground();
  animateCardIn();
  startAuthExperience();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuth);
} else {
  initAuth();
}

window.addEventListener("load", () => {
  if (!window.__authInitialized) {
    initAuth();
  }
});
