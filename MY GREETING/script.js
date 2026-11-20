/* =================================
   SCREEN NAVIGATION
================================= */

function nextScreen(number) {

  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  document.getElementById('screen' + number)
    .classList.add('active');

  // Update progress indicator
  const totalScreens = 6;
  const percentage = (number / totalScreens) * 100;

  document.getElementById('progressFill').style.width =
    percentage + '%';

  document.getElementById('progressText').textContent =
    number + ' / ' + totalScreens;

  // Scroll back to top when changing screens
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* =================================
   ENVELOPE ANIMATION
================================= */

function openEnvelope() {

  const envelope = document.getElementById('envelope');

  if (envelope.classList.contains('opened')) return;

  envelope.classList.add('opened');
  createHeartBurst();

  // Open the next screen after the envelope animation
  setTimeout(() => {
    nextScreen(2);
  }, 1000);
}


/* =================================
   RUNAWAY NO BUTTON
================================= */

const noBtn = document.getElementById('noBtn');
const buttonArea = document.getElementById('buttonArea');

function moveNoButton() {

  const area = buttonArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const maxX = area.width - btn.width;
  const maxY = area.height - btn.height;

  const randomX = Math.random() * Math.max(0, maxX);
  const randomY = Math.random() * Math.max(0, maxY);

  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';
  noBtn.style.transform = 'none';
}

// Runs away when the mouse approaches
noBtn.addEventListener('pointerenter', moveNoButton);

// Runs away when touched on a phone
noBtn.addEventListener('pointerdown', function(event) {
  event.preventDefault();
  moveNoButton();
});

// Prevent clicking NO
noBtn.addEventListener('click', function(event) {
  event.preventDefault();
  moveNoButton();
});


/* =================================
   CLICKABLE HEARTS
================================= */

// CHANGE THESE MESSAGES TO YOUR OWN REASONS!

const reasons = [

  "Thank you for making me feel loved💗",

  "THANK YOU FOR BEING POGIIIIII😚😋🩷",

  "You make even the simplest moments special❤️",

  "THANKYOUUUU AGAIN FOR BEING SARAPPP😚🤤",

  "THANKYOUUU FOR ALWAYS FEEDING ME SARAP ULAM AND FOODS 💗🍽️"

];

function showReason(index, button) {

  document.getElementById('reasonText').textContent =
    reasons[index];

  // Mark the selected heart
  button.classList.add('revealed');

  button.textContent = '♥';
}


/* =================================
   BACKGROUND MUSIC
================================= */

const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

async function toggleMusic() {

  if (music.paused) {

    try {
      await music.play();
      musicBtn.textContent = '♫ Pause Music';
    } catch (error) {
      musicBtn.textContent = 'Music unavailable';
      console.error('Music could not play:', error);
    }

  } else {

    music.pause();
    musicBtn.textContent = '♫ Play Music';

  }
}


/* =================================
   FINAL SURPRISE
================================= */

function showFinalSurprise() {

  const message = document.getElementById('finalMessage');

  message.classList.remove('hidden');

  // Make the surprise appear on screen
  message.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });

  createHeartBurst();
}


/* =================================
   FLOATING HEART ANIMATION
================================= */

function createBackgroundHearts() {

  const container = document.getElementById('floatingHearts');
  const symbols = ['💗', '💕', '♡', '♥', '💖', '❤️', '🩷'];

  for (let i = 0; i < 45; i++) {
    const heart = document.createElement('span');

    heart.classList.add('background-heart');
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.fontSize = (18 + Math.random() * 38) + 'px';
    heart.style.animationDelay = (Math.random() * 3) + 's';

    container.appendChild(heart);
  }
}

createBackgroundHearts();

function createFloatingHeart() {

  const container = document.getElementById('floatingHearts');

  const heart = document.createElement('span');

  heart.classList.add('floating-heart');

  const symbols = ['💗', '💕', '♡', '💖', '✨'];

  heart.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left = Math.random() * 100 + 'vw';

  heart.style.fontSize =
    (15 + Math.random() * 20) + 'px';

  heart.style.animationDuration =
    (5 + Math.random() * 5) + 's';

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

// Create floating decorations periodically
setInterval(createFloatingHeart, 300);

/* =================================
   FINAL HEART BURST
================================= */

function createHeartBurst() {

  for (let i = 0; i < 60; i++) {
    setTimeout(createFloatingHeart, i * 70);
  }

}


/* =================================
   REPLAY WEBSITE
================================= */

function restartWebsite() {

  // Reset the envelope
  document.getElementById('envelope')
    .classList.remove('opened');

  // Reset hearts
  document.querySelectorAll('.heart-btn').forEach(button => {
    button.classList.remove('revealed');
    button.textContent = '♡';
  });

  // Reset reason message
  document.getElementById('reasonText').textContent =
    'Pick a heart, mahal. ♡';

  // Reset final surprise
  document.getElementById('finalMessage')
    .classList.add('hidden');

  // Reset NO button
  noBtn.style.left = '60%';
  noBtn.style.top = '50%';
  noBtn.style.transform = 'translate(-50%, -50%)';

  // Return to the first screen
  nextScreen(1);

}

const welcomeEnvelope = document.getElementById('envelope');

if (welcomeEnvelope) {
  welcomeEnvelope.addEventListener('pointermove', function(event) {
    const rect = welcomeEnvelope.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    welcomeEnvelope.style.transform =
      `translateY(-8px) rotate(${x * 8}deg) scale(1.04)`;
  });

  welcomeEnvelope.addEventListener('pointerleave', function() {
    welcomeEnvelope.style.transform = '';
  });

  document.getElementById('screen1').addEventListener('pointerdown', function(event) {
    const heart = document.createElement('span');
    heart.textContent = ['💗', '💕', '♡', '💖'][Math.floor(Math.random() * 4)];
    heart.style.position = 'fixed';
    heart.style.left = event.clientX + 'px';
    heart.style.top = event.clientY + 'px';
    heart.style.zIndex = '20';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatingHeartClick 1s ease-out forwards';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  });
}
