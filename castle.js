(() => {
  const launcher = document.querySelector('.castle-launcher');
  const overlay = document.querySelector('.castle-overlay');
  const closeBtn = document.querySelector('.castle-close');
  const navButtons = Array.from(document.querySelectorAll('.castle-nav-btn'));
  const roomElements = Array.from(document.querySelectorAll('.castle-room'));
  const canvas = document.querySelector('.castle-canvas');
  const stage = document.querySelector('.castle-room-view');
  const doorRoom = document.querySelector('.room-1');
  const gardenSurface = document.querySelector('.garden-surface');
  const gardenButton = document.querySelector('.garden-btn');
  const gardenMessage = document.querySelector('.garden-msg');
  const promiseCard = document.querySelector('.promise-card');
  const promiseButton = document.querySelector('.promise-btn');
  const treasureButtons = Array.from(document.querySelectorAll('.treasure-chest'));
  const treasureNote = document.querySelector('.treasure-note');
  const crownButton = document.querySelector('.crown-btn');
  const crownMessage = document.querySelector('.crown-msg');
  const secretDoor = document.querySelector('.secret-door');
  const secretMessage = document.querySelector('.secret-msg');
  const bonusNote = document.querySelector('.bonus-note');
  const magicObjects = Array.from(document.querySelectorAll('.magic-object'));

  let activeRoom = 0;
  let flowerCount = 0;
  let promiseIndex = 0;
  let roomUnlocked = false;
  let hiddenObjectsFound = 0;
  let randomTimer = null;

  const promises = Array.from({ length: 100 }, (_, i) => `Promise ${i + 1}: I will keep choosing your happiness, again and again.`);
  const treasureItems = [
    'A warm smile that turns every day into a celebration.',
    'A tiny joke that makes your heart laugh.',
    'A compliment that feels like sunlight on my soul.',
    'A dream of us under the stars, forever hand in hand.',
    'A love message that says you are my favorite miracle.',
    'The greatest treasure I ever found is You ❤️'
  ];
  const bonusMessages = [
    'You found a tiny heart. Your love is glowing brighter.',
    'You found a small key. A secret path of romance opens.',
    'You found a butterfly. Magic is following your heart.',
    'You found a flower. Joy is blooming around you.',
    'You found a diamond. The castle recognizes your devotion.',
    'You found the moon. Soft dreams are now yours.',
    'You found a star. Your love shines in every room.'
  ];

  function setActiveRoom(index) {
    activeRoom = index;
    navButtons.forEach((button, i) => button.classList.toggle('is-active', i === index));
    roomElements.forEach((room, i) => room.classList.toggle('is-active', i === index));
  }

  function spawnParticles(count, origin) {
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement('span');
      const dx = (Math.random() - 0.5) * 240;
      const dy = (Math.random() - 0.8) * 260;
      particle.className = ['surprise-heart', 'surprise-star', 'surprise-firefly', 'surprise-petal'][Math.floor(Math.random() * 4)];
      particle.style.left = `${origin.x}px`;
      particle.style.top = `${origin.y}px`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      stage.appendChild(particle);
      setTimeout(() => particle.remove(), 1400);
    }
  }

  function showRandomEvent() {
    const eventTypes = ['flower', 'butterfly', 'heart', 'star', 'firefly', 'sparkle'];
    const selected = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const bubble = document.createElement('div');
    bubble.className = 'surprise-heart';
    bubble.textContent = selected === 'flower' ? '🌸' : selected === 'butterfly' ? '🦋' : selected === 'heart' ? '💖' : selected === 'star' ? '⭐' : selected === 'firefly' ? '✨' : '💫';
    bubble.style.position = 'fixed';
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    bubble.style.zIndex = '45';
    bubble.style.animation = 'burstOut 1.8s ease-out forwards';
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1800);
  }

  function startRandomEvents() {
    clearInterval(randomTimer);
    randomTimer = setInterval(() => {
      showRandomEvent();
    }, 10000);
  }

  function createFireflies() {
    const ctx = canvas.getContext('2d');
    const fireflies = Array.from({ length: 22 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 1.2 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    }));

    const render = () => {
      const { width, height } = canvas;
      if (!canvas || !ctx) return;
      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);
      fireflies.forEach((firefly) => {
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;
        if (firefly.x < 0 || firefly.x > width) firefly.vx *= -1;
        if (firefly.y < 0 || firefly.y > height) firefly.vy *= -1;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(255, 142, 203, 0.9)';
        ctx.fill();
      });
      window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(render);
  }

  function openCastle() {
    overlay.classList.add('is-open');
    document.body.classList.add('castle-active');
    setTimeout(() => {
      doorRoom.classList.add('is-animating');
      setTimeout(() => doorRoom.classList.remove('is-animating'), 1400);
      setActiveRoom(0);
      createFireflies();
      startRandomEvents();
    }, 220);
  }

  function closeCastle() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('castle-active');
    clearInterval(randomTimer);
  }

  launcher?.addEventListener('click', openCastle);
  closeBtn?.addEventListener('click', closeCastle);
  overlay?.addEventListener('click', (event) => {
    if (event.target === overlay) closeCastle();
  });

  navButtons.forEach((button, index) => {
    button.addEventListener('click', () => setActiveRoom(index));
  });

  gardenButton?.addEventListener('click', () => {
    if (flowerCount >= 8) {
      gardenMessage.textContent = 'You made my world bloom.';
      return;
    }

    const bloom = document.createElement('div');
    bloom.className = 'flower-bloom';
    const x = 16 + Math.random() * 70;
    const y = 16 + Math.random() * 70;
    bloom.style.left = `${x}%`;
    bloom.style.top = `${y}%`;
    gardenSurface?.appendChild(bloom);
    flowerCount += 1;
    if (flowerCount >= 8) {
      gardenMessage.textContent = 'You made my world bloom.';
      spawnParticles(18, { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 });
    }
  });

  promiseButton?.addEventListener('click', () => {
    if (promiseIndex >= promises.length) {
      promiseCard.textContent = 'Every promise I make is a little more love for you.';
      return;
    }
    promiseCard.textContent = promises[promiseIndex];
    promiseIndex += 1;
  });

  treasureButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      treasureNote.textContent = treasureItems[index];
      if (index === treasureItems.length - 1) {
        spawnParticles(24, { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 });
      }
    });
  });

  crownButton?.addEventListener('click', () => {
    crownMessage.textContent = 'You will forever remain the Queen of My Heart.';
    spawnParticles(36, { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 });
  });

  magicObjects.forEach((object) => {
    object.addEventListener('click', () => {
      hiddenObjectsFound += 1;
      const message = bonusMessages[Math.min(hiddenObjectsFound - 1, bonusMessages.length - 1)];
      bonusNote.textContent = message;
      object.remove();
    });
  });

  secretDoor?.addEventListener('click', () => {
    if (!roomUnlocked) {
      if (flowerCount >= 8 && promiseIndex >= 6 && treasureButtons.length > 0 && crownMessage.textContent.includes('Queen')) {
        roomUnlocked = true;
        secretDoor.classList.add('is-unlocked');
        secretMessage.textContent = 'You didn’t just enter this castle... You became the reason it exists.';
        spawnParticles(60, { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 });
        setActiveRoom(5);
      } else {
        secretMessage.textContent = 'Complete the earlier rooms to reveal the heart chamber.';
      }
    }
  });

  window.addEventListener('resize', () => {
    const { width, height } = canvas;
    if (canvas && width && height) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
})();
