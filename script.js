const relationshipStart = new Date("2006-07-23T00:00:00");
const timelineData = [
  { title: "🌸 The Day We Met", text: "The moment your smile found mine and the world felt softer." },
  { title: "❤️ Our First Conversation", text: "A few words turned into a connection I never wanted to lose." },
  { title: "🥰 Our First Laugh Together", text: "A little laughter became the beginning of endless joy." },
  { title: "💕 Beautiful Memories", text: "Every shared memory now shines like stars in my heart." },
  { title: "🎂 Your Special Birthday", text: "Today I celebrate the sweetest soul in my universe." }
];

const reasons = [
  { title: "Your Smile", note: "Your smile turns ordinary moments into something magical." },
  { title: "Your Eyes", note: "Your eyes hold the softness of my favorite dreams." },
  { title: "Your Voice", note: "Even your silence feels like a sweet melody to me." },
  { title: "Your Kindness", note: "Your kindness makes the world feel gentler and warmer." },
  { title: "Your Care", note: "Your care makes me feel safe in every season of life." },
  { title: "Your Support", note: "You are the calm that steadies my heart when life feels heavy." },
  { title: "Your Hugs", note: "Your hugs make my worries disappear like morning mist." },
  { title: "Your Innocence", note: "Your innocence is one of the purest beauties I adore." },
  { title: "Your Beautiful Heart", note: "Your heart is the most beautiful place I have ever known." },
  { title: "Everything About You", note: "Everything about you feels like poetry written just for me." },
  { title: "The Way You Laugh", note: "Your laughter is the sweetest sound my soul has ever heard." },
  { title: "The Way You Glow", note: "Your glow makes every dark place around you feel alive." },
  { title: "The Way You Love Me", note: "The way you love me makes my heart feel cherished forever." },
  { title: "The Way You Comfort Me", note: "You comfort me with a love that feels like home." },
  { title: "Your Softness", note: "Your softness brings peace into every corner of my heart." },
  { title: "Your Strength", note: "Your strength inspires me to be braver every single day." },
  { title: "Your Warmth", note: "Your warmth makes even the coldest days feel gentle." },
  { title: "Your Grace", note: "Your grace is beautiful in the quietest and simplest ways." },
  { title: "Your Patience", note: "Your patience teaches my heart how to breathe with ease." },
  { title: "Your Sweetness", note: "Your sweetness is the kind of love that never stops shining." },
  { title: "Your Magic", note: "You make ordinary moments feel like little miracles." },
  { title: "Your Presence", note: "Your presence alone makes life feel more meaningful." },
  { title: "Your Gentle Soul", note: "Your gentle soul is a rare and precious gift to me." },
  { title: "Your Pure Heart", note: "Your pure heart is the reason my love feels so safe." },
  { title: "Your Confidence", note: "Your confidence makes your beauty shine even brighter." },
  { title: "Your Tenderness", note: "Your tenderness is the sweetest form of love I have ever known." },
  { title: "Your Charm", note: "Your charm makes every moment with you unforgettable." },
  { title: "Your Sparkle", note: "Your sparkle turns even the simplest day into a celebration." },
  { title: "Your Silence", note: "The peace in your silence speaks to my heart in beautiful ways." },
  { title: "Your Thoughts", note: "Your thoughts are always filled with the kindest love." },
  { title: "Your Dreamy Eyes", note: "Your dreamy eyes hold the color of all my sweetest wishes." },
  { title: "Your Radiance", note: "Your radiance makes the whole world feel brighter." },
  { title: "Your Calm", note: "Your calm is the comfort I reach for when I need peace." },
  { title: "Your Humor", note: "Your humor makes every memory with you feel lighter and sweeter." },
  { title: "Your Romantic Spirit", note: "Your romantic heart makes love feel magical and alive." },
  { title: "Your Love", note: "Your love is the greatest blessing my heart has ever received." },
  { title: "Your Joy", note: "Your joy spreads through me like sunshine after rain." },
  { title: "Your Personality", note: "Your beautiful personality is the reason I fall for you again and again." },
  { title: "Your Naughtiness", note: "Your playful side makes my heart smile in the sweetest way." },
  { title: "Your Effort", note: "The care you put into everything makes me admire you even more." },
  { title: "Your Beauty", note: "Your beauty is timeless, graceful, and unforgettable." },
  { title: "Your Passion", note: "Your passion makes everything around you feel full of life." },
  { title: "Your Dedication", note: "Your dedication inspires me to love you with all my heart." },
  { title: "Your Soul", note: "Your soul is the most beautiful part of your whole existence." },
  { title: "Your Meaning", note: "You give my life meaning in the softest, deepest way." },
  { title: "Your Blessing", note: "You are a blessing I will never stop thanking life for." },
  { title: "Your Love Story", note: "Our love story is the sweetest chapter I will forever treasure." },
  { title: "Your Forever", note: "You are my forever, my sweetest dream, my heart’s home." }
];

const galleryItems = [
  { src: "assets/images/WhatsApp Image 2026-06-26 at 11.22.46 PM.jpeg", alt: "Our first beautiful memory" },
  { src: "assets/images/WhatsApp Image 2026-06-26 at 11.22.46 PM (1).jpeg", alt: "A precious moment together" },
  { src: "assets/images/WhatsApp Image 2026-06-26 at 11.22.47 PM.jpeg", alt: "Our sweetest memory" }
];

const musicTracks = [
  { title: "Track 1 · Moonlight", color: "#ff8ecb", melody: [261.63, 293.66, 329.63, 392.0, 440.0, 392.0, 329.63, 293.66, 261.63] },
  { title: "Track 2 · Rose Glow", color: "#c4b3ff", melody: [329.63, 392.0, 440.0, 493.88, 440.0, 392.0, 349.23, 329.63] },
  { title: "Track 3 · Forever", color: "#ffc3e0", melody: [220.0, 246.94, 261.63, 293.66, 329.63, 293.66, 261.63, 246.94, 220.0] }
];

const ambientLayer = document.querySelector(".ambient-layer");
const cursorGlow = document.querySelector(".cursor-glow");
const preloader = document.querySelector(".preloader");
const particles = document.querySelector(".preloader-particles");
const heroButton = document.querySelector(".hero-btn");
const loveHeart = document.getElementById("love-heart");
const meterLabel = document.getElementById("meter-label");
const envelope = document.getElementById("envelope");
const letterText = document.getElementById("letter-text");
const letterScroll = document.getElementById("letter-scroll");
const timeline = document.getElementById("timeline");
const reasonsGrid = document.getElementById("reasons-grid");
const galleryGrid = document.getElementById("gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const cakeBtn = document.getElementById("cake-btn");
const cake = document.querySelector(".cake");
const cakeMessage = document.getElementById("cake-message");
const giftBox = document.getElementById("gift-box");
const giftMessage = document.getElementById("gift-message");
const quizOptions = document.querySelectorAll(".quiz-option");
const quizAnswer = document.getElementById("quiz-answer");
const promiseGenerator = document.getElementById("promise-generator");
const promiseOutput = document.getElementById("promise-output");
const moodButtons = document.querySelectorAll(".mood-btn");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const trackLabel = document.getElementById("player-track");
const volumeInput = document.getElementById("volume");
const easterOverlay = document.getElementById("easter-overlay");
const audioElement = document.getElementById("bg-audio");

let loveCounter = 0;
let currentTrack = 0;
let isPlaying = false;
let playTimer;
let easterClicks = 0;
let melodyIndex = 0;

function createAmbientEffects() {
  for (let i = 0; i < 28; i += 1) {
    const heart = document.createElement("div");
    heart.className = "float-heart";
    heart.textContent = "💗";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 7}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    ambientLayer.appendChild(heart);
  }

  for (let i = 0; i < 45; i += 1) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${4 + Math.random() * 6}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    ambientLayer.appendChild(star);
  }

  for (let i = 0; i < 20; i += 1) {
    const firefly = document.createElement("div");
    firefly.className = "firefly";
    firefly.style.left = `${Math.random() * 100}%`;
    firefly.style.top = `${Math.random() * 100}%`;
    firefly.style.animationDuration = `${2 + Math.random() * 4}s`;
    firefly.style.animationDelay = `${Math.random() * 4}s`;
    ambientLayer.appendChild(firefly);
  }

  for (let i = 0; i < 16; i += 1) {
    const particle = document.createElement("span");
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 1.4}s`;
    particles.appendChild(particle);
  }
}

function updateTimer() {
  const now = new Date();
  const diff = now - relationshipStart;
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function renderTimeline() {
  timeline.innerHTML = timelineData
    .map(
      (item) => `
        <article class="timeline-card glass-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");

  const cards = document.querySelectorAll(".timeline-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => observer.observe(card));
}

function renderReasons() {
  reasonsGrid.innerHTML = reasons
    .map(
      (reason, index) => `
        <div class="reason-card" data-index="${index}">
          <div class="card-inner">
            <div class="reason-face front">
              <h3>${reason.title}</h3>
            </div>
            <div class="reason-face back">
              <p>${reason.note}</p>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  document.querySelectorAll(".reason-card").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("is-flipped"));
  });
}

function typeLetter() {
  const message = `My Dear Kanmani,\n\nYou are the most beautiful part of my life.\nEvery smile of yours makes my day brighter.\nThank you for loving me, supporting me and making my life beautiful.\nThank you for your endless kindness and for making our family glow with love.\n\nI am grateful for our mother, Maragatham, whose warmth guides us.\nI am grateful for our father, Murugesh, whose strength supports us.\nAnd a special thank you to Guru Charani akka for her love, support, and wisdom.\n\nYour family has been my greatest blessing, and I promise to cherish every moment with you.\n\nHappy Birthday My Love ❤️\n\nForever Yours,\n\nSachu ❤️`;
  let index = 0;
  letterText.textContent = "";

  const typing = setInterval(() => {
    letterText.textContent += message[index];
    index += 1;
    if (index >= message.length) {
      clearInterval(typing);
    }
  }, 25);
}

function handleEnvelopeClick() {
  envelope.classList.toggle("is-open");
  if (envelope.classList.contains("is-open")) {
    setTimeout(typeLetter, 420);
  } else {
    letterText.textContent = "";
  }
}

function updateMeter() {
  if (loveCounter >= 1000) {
    meterLabel.textContent = "I Love You Infinity ❤️";
  } else if (loveCounter >= 500) {
    meterLabel.textContent = "I Love You ×500";
  } else if (loveCounter >= 100) {
    meterLabel.textContent = "I Love You ×100";
  } else {
    meterLabel.textContent = "I Love You ×100";
  }
}

function handleLoveHeart(e) {
  e.preventDefault();
  loveCounter += 1;
  easterClicks += 1;
  updateMeter();
  if (easterClicks >= 10) {
    easterOverlay.classList.add("is-visible");
    for (let i = 0; i < 70; i += 1) {
      const heart = document.createElement("div");
      heart.className = "float-heart";
      heart.textContent = "💖";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${2.2 + Math.random() * 2.3}s`;
      ambientLayer.appendChild(heart);
      setTimeout(() => heart.remove(), 1800);
    }
    setTimeout(() => easterOverlay.classList.remove("is-visible"), 2200);
    easterClicks = 0;
  }
}

function renderGallery() {
  galleryGrid.innerHTML = galleryItems
    .map(
      (item) => `
        <button class="gallery-card" data-src="${item.src}" aria-label="Open ${item.alt}">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" />
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      lightboxImage.src = card.dataset.src;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
}

function createFireworks() {
  for (let i = 0; i < 60; i += 1) {
    const burst = document.createElement("span");
    burst.className = "firework";
    burst.style.left = `${Math.random() * 100}%`;
    burst.style.top = `${Math.random() * 100}%`;
    burst.style.setProperty("--dx", `${(Math.random() - 0.5) * 220}px`);
    burst.style.setProperty("--dy", `${(Math.random() - 0.5) * 220}px`);
    burst.style.background = ["#ff8ecb", "#c4b3ff", "#fff", "#ffd7af"][Math.floor(Math.random() * 4)];
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 900);
  }
}

function createConfetti() {
  for (let i = 0; i < 40; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${Math.random() * 100}%`;
    piece.style.background = ["#ff8ecb", "#c4b3ff", "#fff", "#ffb6d0"][Math.floor(Math.random() * 4)];
    piece.style.animationDuration = `${1.2 + Math.random() * 1.4}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1800);
  }
}

function launchCelebration() {
  cake.classList.add("is-blown");
  cakeBtn.disabled = true;
  cakeMessage.textContent = "Happy Birthday Kanmani ❤️";
  document.querySelector(".candle").classList.add("is-off");
  createFireworks();
  createConfetti();
  for (let i = 0; i < 15; i += 1) {
    const heart = document.createElement("div");
    heart.className = "float-heart";
    heart.textContent = "💖";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    ambientLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 1400);
  }
}

function openGift() {
  if (giftBox.classList.contains("is-open")) {
    return;
  }

  giftBox.classList.add("is-open");
  giftMessage.textContent = "My kisses are your gift, my love 💋💖";
  for (let i = 0; i < 40; i += 1) {
    const kiss = document.createElement("div");
    kiss.className = "float-heart";
    kiss.textContent = "💋";
    kiss.style.left = `${Math.random() * 100}%`;
    kiss.style.top = `${Math.random() * 100}%`;
    kiss.style.animationDuration = `${3.2 + Math.random() * 2.4}s`;
    ambientLayer.appendChild(kiss);
    setTimeout(() => kiss.remove(), 30000);
  }

  for (let i = 0; i < 24; i += 1) {
    const heart = document.createElement("div");
    heart.className = "float-heart";
    heart.textContent = "💘";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${4 + Math.random() * 2.5}s`;
    ambientLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 30000);
  }
}

function setUpQuiz() {
  quizOptions.forEach((option) => {
    option.addEventListener("click", () => {
      quizAnswer.hidden = false;
      quizAnswer.textContent = "Correct Answer ❤️";
    });
  });
}

function attachPremiumInteractions() {
  const promises = [
    "I will keep choosing your smile, every single day.",
    "I will hold your heart with gentleness and forever.",
    "I will make your ordinary days feel like a fairytale.",
    "I will keep loving the beautiful soul that you are.",
    "I will always be your soft place to belong."
  ];

  promiseGenerator?.addEventListener("click", () => {
    const nextPromise = promises[Math.floor(Math.random() * promises.length)];
    promiseOutput.textContent = nextPromise;
  });

  moodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      moodButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      document.body.dataset.mood = button.dataset.mood;
    });
  });

  let trailTimer;
  document.addEventListener("mousemove", (event) => {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = "💗";
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;
    heart.style.animationDuration = "1.2s";
    heart.style.position = "fixed";
    heart.style.zIndex = "0";
    heart.style.pointerEvents = "none";
    document.body.appendChild(heart);
    clearTimeout(trailTimer);
    trailTimer = setTimeout(() => heart.remove(), 1100);
  });
}

function initAudio() {
  if (!audioElement) {
    return;
  }

  const audioUrl = "assets/music/Mental-Manadhil.mp3";
  if (audioElement.src !== window.location.href + audioUrl) {
    audioElement.src = audioUrl;
  }

  audioElement.preload = "auto";
  audioElement.volume = Number(volumeInput.value);
  audioElement.load();
}

function stopAudio() {
  if (audioElement) {
    audioElement.pause();
  }
  isPlaying = false;
  document.querySelector(".equalizer")?.classList.remove("is-playing");
  playBtn.textContent = "▶";
}

async function startAudio() {
  initAudio();

  if (!audioElement) {
    return;
  }

  if (isPlaying) {
    stopAudio();
    return;
  }

  try {
    audioElement.volume = Number(volumeInput.value);
    audioElement.currentTime = 0;
    await audioElement.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
    document.querySelector(".equalizer")?.classList.add("is-playing");
    trackLabel.textContent = "Mental Manathil · O Kadhal Kanmani";
  } catch (error) {
    console.error("Audio play failed", error);
    isPlaying = false;
    playBtn.textContent = "▶";
  }
}

function changeTrack(direction) {
  currentTrack = (currentTrack + direction + musicTracks.length) % musicTracks.length;
  trackLabel.textContent = musicTracks[currentTrack].title;
  melodyIndex = 0;
  if (isPlaying) {
    stopAudio();
    startAudio();
  }
}

function attachEvents() {
  heroButton.addEventListener("click", () => {
    document.querySelector(heroButton.dataset.scroll).scrollIntoView({ behavior: "smooth" });
  });

  loveHeart.addEventListener("click", handleLoveHeart);
  envelope.addEventListener("click", handleEnvelopeClick);
  cakeBtn.addEventListener("click", launchCelebration);
  giftBox.addEventListener("click", openGift);
  lightboxClose.addEventListener("click", closeLightbox);
  letterScroll.addEventListener("click", () => {
    const letter = document.getElementById("letter");
    letter.scrollBy({ top: 90, behavior: "smooth" });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
  playBtn.addEventListener("click", async () => {
    await startAudio();
  });
  prevBtn.addEventListener("click", () => changeTrack(-1));
  nextBtn.addEventListener("click", () => changeTrack(1));
  volumeInput.addEventListener("input", () => {
    if (audioElement) {
      audioElement.volume = Number(volumeInput.value);
    }
  });
  document.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll("[data-scroll]").forEach((control) => {
    control.addEventListener("click", () => {
      const target = document.querySelector(control.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function init() {
  createAmbientEffects();
  renderTimeline();
  renderReasons();
  renderGallery();
  setUpQuiz();
  attachPremiumInteractions();
  attachEvents();
  updateTimer();
  setInterval(updateTimer, 1000);
  setTimeout(() => preloader.classList.add("is-hidden"), 2200);
}

document.addEventListener("DOMContentLoaded", init);
