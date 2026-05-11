let startTime = Date.now();
let isStarted = false;

const wrapper = document.getElementById('main-wrapper');
const middleCard = document.getElementById('middle-card');
const footerBar = document.getElementById('footer-bar');
const instruction = document.getElementById('instruction');
const clock = document.getElementById('digital-clock');
const sessionCounter = document.getElementById('session-counter');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');

function typeLine(element, text, speed, callback) {
  let i = 0;
  element.innerHTML = '';

  const cursor = document.createElement('span');
  cursor.className = 'cursor';

  function tick() {
    element.textContent = text.slice(0, i);
    element.appendChild(cursor);
    i++;

    if (i <= text.length) {
      setTimeout(tick, speed);
    } else {
      cursor.remove();
      if (callback) callback();
    }
  }

  tick();
}

function startTyping() {
  typeLine(line1, 'calisthenics', 85, () => {
    setTimeout(() => {
      typeLine(line2, 'programmer', 85);
    }, 250);
  });
}

function showContent(e) {
  if (e) e.preventDefault();
  if (isStarted) return;

  middleCard.classList.remove('hidden');
  footerBar.classList.remove('hidden');
  instruction.classList.remove('visible')
  middleCard.classList.add('visible');
  footerBar.classList.add('visible');
  instruction.classList.add('hidden')
  instruction.classList.add('fade-out');
  startTyping();
  isStarted = true;
}

function updateAll() {
  const now = new Date();

  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clock.textContent = `${h}:${m}:${s}`;

  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const timeText = elapsed < 60 ? `${elapsed}s` : `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;
  sessionCounter.textContent = `Stayed for ${timeText}`;
}

wrapper.addEventListener('click', showContent);
setInterval(updateAll, 1000);
updateAll();