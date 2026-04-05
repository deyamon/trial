/* ─────────────────────────────────────────────────────────────
   app.js  —  Birthday site logic
   Edit the sections marked with  ← EDIT THIS  to personalise
───────────────────────────────────────────────────────────── */

/* ─── DATE ──────────────────────────────────────────────────── */
// ← EDIT THIS: year, month (0 = Jan … 11 = Dec), day
const birthday = new Date(2026, 3, 5);
const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
document.getElementById('hero-date').textContent =
  months[birthday.getMonth()] + ' ' + birthday.getDate() + ', ' + birthday.getFullYear();


/* ─── FLOATING PETALS ───────────────────────────────────────── */
const petalBg = document.getElementById('petals');
const petalColors = ['#8b1a1a','#a52525','#7a1515','#c43030','#6b1212'];

for (let i = 0; i < 22; i++) {
  const p = document.createElement('div');
  p.className = 'p';
  const size = 10 + Math.random() * 22;
  Object.assign(p.style, {
    width:           size + 'px',
    height:          size * 0.65 + 'px',
    left:            Math.random() * 100 + '%',
    top:             Math.random() * 100 + '%',
    background:      petalColors[Math.floor(Math.random() * petalColors.length)],
    animationDuration:(12 + Math.random() * 18) + 's',
    animationDelay:  (Math.random() * 15) + 's',
    transform:       `rotate(${Math.random() * 360}deg)`
  });
  petalBg.appendChild(p);
}


/* ─── HERO HEARTS ───────────────────────────────────────────── */
const heroHearts = document.getElementById('hero-hearts');
const heartPositions = [
  { top:'18%', left:'8%',  delay:'0s',   size:'0.8rem'  },
  { top:'30%', left:'88%', delay:'1.2s', size:'0.65rem' },
  { top:'55%', left:'6%',  delay:'2s',   size:'0.55rem' },
  { top:'70%', left:'91%', delay:'0.6s', size:'0.7rem'  },
  { top:'82%', left:'14%', delay:'1.8s', size:'0.6rem'  },
  { top:'22%', left:'78%', delay:'3s',   size:'0.5rem'  },
  { top:'60%', left:'82%', delay:'2.4s', size:'0.75rem' },
  { top:'42%', left:'4%',  delay:'1s',   size:'0.58rem' },
];
heartPositions.forEach(h => {
  const s = document.createElement('span');
  s.textContent = '♥';
  Object.assign(s.style, {
    top:             h.top,
    left:            h.left,
    animationDelay:  h.delay,
    fontSize:        h.size,
    animationDuration:(4 + Math.random() * 3) + 's'
  });
  heroHearts.appendChild(s);
});


/* ─── BOOKSHELF ─────────────────────────────────────────────── */
// ← EDIT THIS: add her actual favourite books
const books = [
  { title: 'Pride & Prejudice',    author: 'Austen',  color: '#8b1a1a', text: '#f5edd8' },
  { title: 'The Secret History',   author: 'Tartt',   color: '#2c1a0e', text: '#c9a96e' },
  { title: 'Normal People',        author: 'Rooney',  color: '#4a6741', text: '#f5edd8' },
  { title: 'Jane Eyre',            author: 'Brontë',  color: '#7a5c8a', text: '#f5edd8' },
  { title: 'Circe',                author: 'Miller',  color: '#c4a84a', text: '#2c1a0e' },
  { title: 'Little Women',         author: 'Alcott',  color: '#8b3a1a', text: '#f5edd8' },
  { title: 'Wuthering Heights',    author: 'Brontë',  color: '#3a5a3a', text: '#f5edd8' },
  { title: 'The Midnight Library', author: 'Haig',    color: '#1a3a5a', text: '#f5edd8' },
  { title: 'Persuasion',           author: 'Austen',  color: '#6b4c2a', text: '#f5edd8' },
];

const shelf = document.getElementById('shelf');
books.forEach(b => {
  const book = document.createElement('div');
  book.className = 'book';
  book.innerHTML = `
    <div class="book-spine" style="background:${b.color}; color:${b.text};">${b.title}</div>
    <div class="book-tooltip">${b.title} — ${b.author}</div>
  `;
  shelf.appendChild(book);
});


/* ─── PLAYLIST & MP3 PLAYER ─────────────────────────────────── */
// ← EDIT THIS: add the mp3 filename for each track
//   Put your mp3 files in a folder called  music/  next to this file
const tracks = [
  { title: 'Jogi',                  artist: 'Arko ft Aakanksha Sharma',    note: 'This one says it all',                    file: 'jogi.mp3'},
  { title: 'Say My Name',           artist: 'Hozier',                      note: 'Every note, every word',                  file: 'say my name.mp3'},
  { title: 'Thinking Out Loud',     artist: 'Ed Sheeran',                  note: 'People fall in love in mysterious ways',  file: 'thinking out loud.mp3'},
  { title: 'Lover',                 artist: 'Taylor Swift',                note: 'Soft like us',                            file: 'lover.mp3'},
  { title: 'Hero',artist: 'Enrique Iglesias',                              note: 'I would standby you forever',             file: 'hero.mp3'},
];

// player state
const audio    = new Audio();
let currentIdx = 0;
let isPlaying  = false;

// DOM refs
const npTitle    = document.getElementById('np-title');
const npArtist   = document.getElementById('np-artist');
const playBtn    = document.getElementById('play-btn');
const prevBtn    = document.getElementById('prev-btn');
const nextBtn    = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const progressBar  = document.getElementById('progress-bar');
const timeEl     = document.getElementById('time-current');
const durationEl = document.getElementById('time-duration');
const barsEl     = document.getElementById('np-bars');
const trackList  = document.getElementById('tracks');

// helpers
function fmt(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = String(Math.floor(s % 60)).padStart(2, '0');
  return `${m}:${sec}`;
}

function loadTrack(idx) {
  const t = tracks[idx];
  audio.src = t.file;
  npTitle.textContent  = t.title;
  npArtist.textContent = t.artist;
  progressFill.style.width = '0%';
  timeEl.textContent = '0:00';
  durationEl.textContent = '0:00';
  // highlight active row
  document.querySelectorAll('.track').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
    const num = el.querySelector('.track-num');
    const bars = el.querySelector('.track-bars');
    if (i === idx) {
      if (bars) bars.style.display = isPlaying ? 'flex' : 'none';
      if (num)  num.style.display  = isPlaying ? 'none' : 'block';
    } else {
      if (bars) bars.style.display = 'none';
      if (num)  num.style.display  = 'block';
    }
  });
}

function play() {
  audio.play();
  isPlaying = true;
  playBtn.classList.add('is-playing');
  barsEl.classList.remove('paused');
  // show bars on active row
  const activeRow = document.querySelectorAll('.track')[currentIdx];
  if (activeRow) {
    const bars = activeRow.querySelector('.track-bars');
    const num  = activeRow.querySelector('.track-num');
    if (bars) bars.style.display = 'flex';
    if (num)  num.style.display  = 'none';
  }
}

function pause() {
  audio.pause();
  isPlaying = false;
  playBtn.classList.remove('is-playing');
  barsEl.classList.add('paused');
  const activeRow = document.querySelectorAll('.track')[currentIdx];
  if (activeRow) {
    const bars = activeRow.querySelector('.track-bars');
    const num  = activeRow.querySelector('.track-num');
    if (bars) bars.style.display = 'none';
    if (num)  num.style.display  = 'block';
  }
}

function goTo(idx) {
  currentIdx = (idx + tracks.length) % tracks.length;
  loadTrack(currentIdx);
  if (isPlaying) play();
}

// controls
playBtn.addEventListener('click', () => { isPlaying ? pause() : play(); });
prevBtn.addEventListener('click', () => goTo(currentIdx - 1));
nextBtn.addEventListener('click', () => goTo(currentIdx + 1));

// progress
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + '%';
  timeEl.textContent = fmt(audio.currentTime);
});
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = fmt(audio.duration);
});
audio.addEventListener('ended', () => goTo(currentIdx + 1));

// click on progress bar to seek
progressBar.addEventListener('click', e => {
  const rect = progressBar.getBoundingClientRect();
  const pct  = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});

// build track rows
tracks.forEach((t, i) => {
  const el = document.createElement('div');
  el.className = 'track' + (i === 0 ? ' active' : '');
  el.innerHTML = `
    <div class="track-bars" style="display:none;">
      <span style="height:6px"></span>
      <span style="height:12px"></span>
      <span style="height:8px"></span>
    </div>
    <span class="track-num">${String(i + 1).padStart(2, '0')}</span>
    <div class="track-info">
      <div class="track-title">${t.title}</div>
      <div class="track-artist">${t.artist}</div>
    </div>
    <div class="track-note">${t.note}</div>
  `;
  el.addEventListener('click', () => {
    const wasPlaying = isPlaying;
    currentIdx = i;
    loadTrack(i);
    if (wasPlaying || !isPlaying) play();
  });
  trackList.appendChild(el);
});

// initialise first track
loadTrack(0);


/* ─── PEEK SWIPER ───────────────────────────────────────────── */
(function () {
  const track  = document.getElementById('swiper-track');
  const dotsEl = document.getElementById('swiper-dots');
  const prevBtn = document.getElementById('swiper-prev');
  const nextBtn = document.getElementById('swiper-next');
  const cards  = Array.from(track.querySelectorAll('.mem-card'));
  let current  = 0;

  // build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'swiper-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function updateDots(idx) {
    dotsEl.querySelectorAll('.swiper-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  function updateActive(idx) {
    cards.forEach((c, i) => c.classList.toggle('is-active', i === idx));
    updateDots(idx);
    current = idx;
  }

  function goTo(idx) {
    idx = Math.max(0, Math.min(idx, cards.length - 1));
    const card = cards[idx];
    const trackRect = track.getBoundingClientRect();
    const cardRect  = card.getBoundingClientRect();
    const offset = cardRect.left - trackRect.left - (trackRect.width / 2) + (cardRect.width / 2);
    track.scrollBy({ left: offset, behavior: 'smooth' });
    updateActive(idx);
  }

  // arrows
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // scroll spy
  let scrollTimer;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((c, i) => {
        const center = c.offsetLeft + c.offsetWidth / 2;
        const dist = Math.abs(center - trackCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      updateActive(closest);
    }, 80);
  });

  // touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // init
  updateActive(0);
  goTo(0);
})();


/* ─── AUDIO NORMALIZATION ───────────────────────────────────── */
// Uses Web Audio API to analyse each track and apply a gain correction
// so all songs play at roughly the same perceived loudness
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx, gainNode, sourceNode;

function initAudioContext() {
  if (audioCtx) return;
  audioCtx  = new AudioContext();
  gainNode  = audioCtx.createGain();
  gainNode.gain.value = 1;
  gainNode.connect(audioCtx.destination);
  sourceNode = audioCtx.createMediaElementSource(audio);
  sourceNode.connect(gainNode);
}

// analyse audio buffer and return a normalisation gain value
async function getNormalizationGain(url) {
  try {
    const res    = await fetch(url);
    const buf    = await res.arrayBuffer();
    const decoded = await audioCtx.decodeAudioData(buf);
    const data   = decoded.getChannelData(0);
    // RMS loudness
    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
    const rms = Math.sqrt(sum / data.length);
    const targetRms = 0.12;
    const gain = Math.min(targetRms / (rms || 0.001), 4); // cap at 4x
    return gain;
  } catch {
    return 1; // fallback if fetch fails
  }
}

// hook into play so we normalize on first play of each track
const gainCache = {};
const _originalPlay = play;
window._normalizedPlay = async function () {
  initAudioContext();
  if (audioCtx.state === 'suspended') await audioCtx.resume();
  const url = tracks[currentIdx].file;
  if (!gainCache[url]) {
    gainCache[url] = await getNormalizationGain(url);
  }
  gainNode.gain.setTargetAtTime(gainCache[url], audioCtx.currentTime, 0.1);
  _originalPlay();
};

// patch play button and track clicks to use normalized play
document.getElementById('play-btn').addEventListener('click', () => {}, true);
// override play in the existing handler — we re-attach below after the player is set up
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(r => observer.observe(r));
