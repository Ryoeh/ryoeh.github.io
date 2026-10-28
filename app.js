/* ==========================================================================
   NOTHING OS INTERACTIVE ENGINE
   - Web Audio API Synthesizer (Zero External Dependencies)
   - Interactive Dot Matrix Canvas Background with Light Flares
   - Nothing Phone (2) Glyph Interface Controller & Sequencer
   - Dot Matrix Cyber Arcade (Packet Runner & Glyph Composer)
   - "Under The Hood" Interactive Cybersecurity Terminal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. WEB AUDIO API SYNTHESIZER
  // ==========================================================================
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Tactile Mechanical Click (Nothing switch / button)
  function playClick(freq = 1200, duration = 0.035) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.value = 800;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio click error:', e);
    }
  }

  // Glyph Ignition / Pulse Tone
  function playGlyphTone(freq = 520, duration = 0.18, type = 'sine') {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  // Cyber Alarm / Breach sound
  function playAlarm() {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  }

  // Sound toggle button in status bar
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      soundToggleBtn.classList.toggle('active', soundEnabled);
      const textSpan = soundToggleBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = soundEnabled ? 'AUDIO: ON' : 'AUDIO: OFF';
      soundToggleBtn.setAttribute('title', soundEnabled ? 'Audio Active (Click to mute)' : 'Audio Muted (Click to enable)');
      playClick(soundEnabled ? 1400 : 700);
    });
  }

  // Theme toggle button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      playClick(1000);
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      themeToggleBtn.classList.toggle('active', nextTheme === 'light');
      const textSpan = themeToggleBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = nextTheme === 'light' ? 'THEME: LIGHT' : 'THEME: DARK';
      themeToggleBtn.setAttribute('title', nextTheme === 'light' ? 'Light Theme Active' : 'Dark Theme Active');
    });
  }

  // Torch Mode toggle
  const torchToggleBtn = document.getElementById('torch-toggle-btn');
  if (torchToggleBtn) {
    torchToggleBtn.addEventListener('click', () => {
      playClick(1600);
      document.body.classList.toggle('torch-active');
      const isActive = document.body.classList.contains('torch-active');
      torchToggleBtn.classList.toggle('active', isActive);
      const textSpan = torchToggleBtn.querySelector('.btn-text');
      if (textSpan) textSpan.textContent = isActive ? 'TORCH: ACTIVE' : 'TORCH: OFF';
      torchToggleBtn.setAttribute('title', isActive ? 'Torch Mode ON (Click to turn off)' : 'Torch Mode OFF (Click to flash)');
      if (isActive) {
        setAllGlyphs(true);
      } else {
        setAllGlyphs(false);
      }
    });
  }

  // ==========================================================================
  // 2. REALTIME DOT MATRIX CLOCK & BATTERY
  // ==========================================================================
  function updateClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Battery status meter
  const batteryEl = document.getElementById('battery-status');
  if (navigator.getBattery && batteryEl) {
    navigator.getBattery().then(battery => {
      function syncBattery() {
        const level = Math.round(battery.level * 100);
        const charging = battery.charging ? '⚡' : '';
        batteryEl.textContent = `${charging}${level}%`;
      }
      syncBattery();
      battery.addEventListener('levelchange', syncBattery);
      battery.addEventListener('chargingchange', syncBattery);
    });
  }

  // ==========================================================================
  // 3. INTERACTIVE DOT MATRIX CANVAS BACKGROUND
  // ==========================================================================
  const canvas = document.getElementById('dot-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let isMouseMoving = false;
    let mouseTimeout;

    const spacing = 28;
    const ripples = [];

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 2000);
    });

    window.addEventListener('click', (e) => {
      // Trigger a light ripple wave from click
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 280,
        opacity: 0.9,
        speed: 8
      });
    });

    function drawDots() {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.15;
      mouseY += (targetMouseY - mouseY) * 0.15;

      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      // Advance ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity = Math.max(0, 1 - r.radius / r.maxRadius);
        if (r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const baseAlpha = isLight ? 0.15 : 0.08;
      const dotColor = isLight ? '0, 0, 0' : '255, 255, 255';

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const x = c * spacing;
          const y = r * spacing;

          // Distance from mouse
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let alpha = baseAlpha;
          let dotRadius = 1.2;

          // Proximity light glow
          if (dist < 150) {
            const factor = 1 - dist / 150;
            alpha = baseAlpha + factor * 0.65;
            dotRadius = 1.2 + factor * 2.2;
          }

          // Ripple effect
          for (const ripple of ripples) {
            const rDist = Math.abs(Math.sqrt((x - ripple.x) ** 2 + (y - ripple.y) ** 2) - ripple.radius);
            if (rDist < 30) {
              const rFactor = (1 - rDist / 30) * ripple.opacity;
              alpha = Math.min(1, alpha + rFactor * 0.8);
              dotRadius = Math.max(dotRadius, 1.2 + rFactor * 2.5);
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dotColor}, ${alpha})`;
          ctx.fill();
        }
      }

      requestAnimationFrame(drawDots);
    }
    requestAnimationFrame(drawDots);
  }

  // ==========================================================================
  // 4. NOTHING PHONE (2) GLYPH INTERFACE CONTROLLER
  // ==========================================================================
  const glyphStrips = document.querySelectorAll('.glyph-strip');
  let glyphAnimationInterval = null;

  function clearGlyphInterval() {
    if (glyphAnimationInterval) {
      clearInterval(glyphAnimationInterval);
      glyphAnimationInterval = null;
    }
  }

  function setAllGlyphs(active, redAlert = false) {
    glyphStrips.forEach(strip => {
      strip.classList.remove('red-alert');
      if (redAlert) {
        strip.classList.add('active', 'red-alert');
      } else {
        strip.classList.toggle('active', active);
      }
    });
  }

  // Interactive click on any glyph strip
  glyphStrips.forEach((strip, index) => {
    strip.addEventListener('click', (e) => {
      e.stopPropagation();
      clearGlyphInterval();
      const willBeActive = !strip.classList.contains('active');
      strip.classList.toggle('active', willBeActive);
      strip.classList.remove('red-alert');

      if (willBeActive) {
        playGlyphTone(400 + index * 120, 0.15);
      } else {
        playClick(800, 0.02);
      }
    });
  });

  // Glyph Preset Animations
  const glyphModeButtons = document.querySelectorAll('.glyph-mode-btn');

  function setActiveGlyphBtn(selectedBtn) {
    glyphModeButtons.forEach(btn => btn.classList.remove('active'));
    if (selectedBtn) selectedBtn.classList.add('active');
  }

  // Preset 1: Pulse Wave
  function runPulseWave() {
    clearGlyphInterval();
    let step = 0;
    glyphAnimationInterval = setInterval(() => {
      glyphStrips.forEach((strip, idx) => {
        strip.classList.remove('red-alert');
        const active = (idx === step % glyphStrips.length) || (idx === (step + 1) % glyphStrips.length);
        strip.classList.toggle('active', active);
      });
      playGlyphTone(380 + (step % 5) * 80, 0.08, 'sine');
      step++;
    }, 180);
  }

  // Preset 2: Cyber Breach Alarm
  function runBreachAlert() {
    clearGlyphInterval();
    let flashCount = 0;
    glyphAnimationInterval = setInterval(() => {
      const isRed = flashCount % 2 === 0;
      setAllGlyphs(true, isRed);
      playAlarm();
      flashCount++;
      if (flashCount > 10) {
        clearGlyphInterval();
        setAllGlyphs(false);
      }
    }, 140);
  }

  // Preset 3: Battery Indicator Fill
  function runBatteryMeter() {
    clearGlyphInterval();
    setAllGlyphs(false);
    const batteryLine = document.getElementById('glyph-batt-line');
    const batteryDot = document.getElementById('glyph-batt-dot');
    
    if (batteryDot) batteryDot.classList.add('active');
    playClick(1000);

    setTimeout(() => {
      if (batteryLine) {
        batteryLine.classList.add('active');
        playGlyphTone(600, 0.3);
      }
    }, 250);
  }

  glyphModeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      playClick(1100);
      setActiveGlyphBtn(btn);

      switch (mode) {
        case 'pulse':
          runPulseWave();
          break;
        case 'breach':
          runBreachAlert();
          break;
        case 'battery':
          runBatteryMeter();
          break;
        case 'torch':
          clearGlyphInterval();
          setAllGlyphs(true);
          playGlyphTone(700, 0.25);
          break;
        case 'off':
          clearGlyphInterval();
          setAllGlyphs(false);
          playClick(600);
          break;
      }
    });
  });

  // Start with a gentle introductory glyph boot sequence
  setTimeout(() => {
    let bootStep = 0;
    const bootTimer = setInterval(() => {
      if (bootStep < glyphStrips.length) {
        glyphStrips[bootStep].classList.add('active');
        playGlyphTone(450 + bootStep * 80, 0.1);
        bootStep++;
      } else {
        clearInterval(bootTimer);
        setTimeout(() => setAllGlyphs(false), 400);
      }
    }, 100);
  }, 600);

  // ==========================================================================
  // 5. NOTHING ARCADE: DOT MATRIX CYBER SNAKE GAME
  // ==========================================================================
  const gameCanvas = document.getElementById('game-canvas');
  let gameCtx = null;
  let gameLoopId = null;

  if (gameCanvas) {
    gameCtx = gameCanvas.getContext('2d');
  }

  const GRID_COLS = 24;
  const GRID_ROWS = 16;
  const CELL_SIZE = 14;

  let snake = [];
  let food = { x: 5, y: 5 };
  let dir = { x: 1, y: 0 };
  let nextDir = { x: 1, y: 0 };
  let score = 0;
  let highScore = parseInt(localStorage.getItem('dot_high_score') || localStorage.getItem('nothing_high_score') || '0', 10);
  let isGameOver = false;
  let isGamePaused = true;
  let gameSpeed = 110;
  let lastFrameTime = 0;

  const scoreValEl = document.getElementById('game-score-val');
  const highValEl = document.getElementById('game-high-val');
  const gameOverlayBtn = document.getElementById('game-start-btn');

  if (highValEl) highValEl.textContent = highScore;

  function resetGame() {
    snake = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 }
    ];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    score = 0;
    if (scoreValEl) scoreValEl.textContent = score;
    spawnFood();
    isGameOver = false;
  }

  function spawnFood() {
    let valid = false;
    while (!valid) {
      food.x = Math.floor(Math.random() * GRID_COLS);
      food.y = Math.floor(Math.random() * GRID_ROWS);
      valid = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
  }

  function drawGame() {
    if (!gameCtx) return;

    // Fill screen with dark canvas
    gameCtx.fillStyle = '#080808';
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Render LED dot matrix background grid
    for (let c = 0; c < GRID_COLS; c++) {
      for (let r = 0; r < GRID_ROWS; r++) {
        const cx = c * CELL_SIZE + CELL_SIZE / 2;
        const cy = r * CELL_SIZE + CELL_SIZE / 2;

        gameCtx.beginPath();
        gameCtx.arc(cx, cy, 1.5, 0, Math.PI * 2);
        gameCtx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        gameCtx.fill();
      }
    }

    // Render Food (Pulsing Red LED)
    const foodX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const foodY = food.y * CELL_SIZE + CELL_SIZE / 2;
    gameCtx.beginPath();
    gameCtx.arc(foodX, foodY, 4.5, 0, Math.PI * 2);
    gameCtx.fillStyle = '#D71921';
    gameCtx.shadowColor = '#D71921';
    gameCtx.shadowBlur = 10;
    gameCtx.fill();
    gameCtx.shadowBlur = 0;

    // Render Snake (White glowing LED dots)
    snake.forEach((segment, idx) => {
      const sx = segment.x * CELL_SIZE + CELL_SIZE / 2;
      const sy = segment.y * CELL_SIZE + CELL_SIZE / 2;

      gameCtx.beginPath();
      const radius = idx === 0 ? 5 : 4.2;
      gameCtx.arc(sx, sy, radius, 0, Math.PI * 2);
      gameCtx.fillStyle = '#ffffff';
      gameCtx.shadowColor = '#ffffff';
      gameCtx.shadowBlur = idx === 0 ? 12 : 6;
      gameCtx.fill();
      gameCtx.shadowBlur = 0;
    });

    // If game over or paused, show overlay text
    if (isGameOver) {
      gameCtx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

      gameCtx.font = '14px Silkscreen, monospace';
      gameCtx.fillStyle = '#D71921';
      gameCtx.textAlign = 'center';
      gameCtx.fillText('BREACH TERMINATED', gameCanvas.width / 2, gameCanvas.height / 2 - 8);

      gameCtx.font = '10px Space Mono, monospace';
      gameCtx.fillStyle = '#ffffff';
      gameCtx.fillText('CLICK START TO RETRY', gameCanvas.width / 2, gameCanvas.height / 2 + 16);
    }
  }

  function gameStep(timestamp) {
    if (!lastFrameTime) lastFrameTime = timestamp;
    const delta = timestamp - lastFrameTime;

    if (!isGamePaused && !isGameOver && delta > gameSpeed) {
      lastFrameTime = timestamp;
      dir = { ...nextDir };

      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      // Wall collision (wrap around or wall death)
      if (head.x < 0 || head.x >= GRID_COLS || head.y < 0 || head.y >= GRID_ROWS) {
        triggerGameOver();
        drawGame();
        return;
      }

      // Self collision
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        triggerGameOver();
        drawGame();
        return;
      }

      snake.unshift(head);

      // Eat Food
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        if (scoreValEl) scoreValEl.textContent = score;
        if (score > highScore) {
          highScore = score;
          localStorage.setItem('dot_high_score', highScore);
          if (highValEl) highValEl.textContent = highScore;
        }
        playGlyphTone(880, 0.12, 'square');
        // Flash a random glyph on food eat!
        const randomStrip = glyphStrips[Math.floor(Math.random() * glyphStrips.length)];
        if (randomStrip) {
          randomStrip.classList.add('active');
          setTimeout(() => randomStrip.classList.remove('active'), 180);
        }
        spawnFood();
      } else {
        snake.pop();
      }
    }

    drawGame();
    if (!isGamePaused && !isGameOver) {
      gameLoopId = requestAnimationFrame(gameStep);
    }
  }

  function triggerGameOver() {
    isGameOver = true;
    isGamePaused = true;
    playAlarm();
    if (gameOverlayBtn) gameOverlayBtn.textContent = 'RESTART SYSTEM';
  }

  function startGame() {
    if (isGameOver) {
      resetGame();
    }
    isGamePaused = false;
    if (gameOverlayBtn) gameOverlayBtn.textContent = 'PAUSE';
    playClick(1400);
    lastFrameTime = 0;
    cancelAnimationFrame(gameLoopId);
    gameLoopId = requestAnimationFrame(gameStep);
  }

  function pauseGame() {
    isGamePaused = true;
    if (gameOverlayBtn) gameOverlayBtn.textContent = 'RESUME';
    playClick(800);
  }

  if (gameOverlayBtn) {
    gameOverlayBtn.addEventListener('click', () => {
      if (isGamePaused || isGameOver) {
        startGame();
      } else {
        pauseGame();
      }
    });
  }

  // Keyboard navigation for snake game
  window.addEventListener('keydown', (e) => {
    // Prevent scrolling when using arrow keys inside game
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      if (document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
      }
    }

    if (e.code === 'ArrowUp' || e.code === 'KeyW') {
      if (dir.y === 0) nextDir = { x: 0, y: -1 };
    } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
      if (dir.y === 0) nextDir = { x: 0, y: 1 };
    } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      if (dir.x === 0) nextDir = { x: -1, y: 0 };
    } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      if (dir.x === 0) nextDir = { x: 1, y: 0 };
    } else if (e.code === 'Space') {
      if (isGamePaused || isGameOver) startGame();
      else pauseGame();
    }
  });

  // Mobile D-Pad Buttons
  const dpadUp = document.getElementById('dpad-up');
  const dpadDown = document.getElementById('dpad-down');
  const dpadLeft = document.getElementById('dpad-left');
  const dpadRight = document.getElementById('dpad-right');

  if (dpadUp) dpadUp.addEventListener('click', () => { if (dir.y === 0) nextDir = { x: 0, y: -1 }; playClick(900); });
  if (dpadDown) dpadDown.addEventListener('click', () => { if (dir.y === 0) nextDir = { x: 0, y: 1 }; playClick(900); });
  if (dpadLeft) dpadLeft.addEventListener('click', () => { if (dir.x === 0) nextDir = { x: -1, y: 0 }; playClick(900); });
  if (dpadRight) dpadRight.addEventListener('click', () => { if (dir.x === 0) nextDir = { x: 1, y: 0 }; playClick(900); });

  // Initial draw
  resetGame();
  drawGame();

  // ==========================================================================
  // 6. ARCADE TABS & GLYPH COMPOSER
  // ==========================================================================
  const tabSnakeBtn = document.getElementById('tab-snake-btn');
  const tabComposerBtn = document.getElementById('tab-composer-btn');
  const snakeContainer = document.getElementById('snake-game-view');
  const composerContainer = document.getElementById('composer-game-view');

  if (tabSnakeBtn && tabComposerBtn) {
    tabSnakeBtn.addEventListener('click', () => {
      tabSnakeBtn.classList.add('active');
      tabComposerBtn.classList.remove('active');
      snakeContainer.style.display = 'block';
      composerContainer.style.display = 'none';
      playClick(1000);
    });

    tabComposerBtn.addEventListener('click', () => {
      tabComposerBtn.classList.add('active');
      tabSnakeBtn.classList.remove('active');
      snakeContainer.style.display = 'none';
      composerContainer.style.display = 'block';
      pauseGame();
      playClick(1200);
    });
  }

  // Composer Pads
  const composerPads = document.querySelectorAll('.composer-pad');
  const padTones = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 Pentatonic

  composerPads.forEach((pad, index) => {
    pad.addEventListener('mousedown', () => {
      triggerPad(index, pad);
    });

    pad.addEventListener('mouseup', () => {
      pad.classList.remove('active');
    });

    pad.addEventListener('mouseleave', () => {
      pad.classList.remove('active');
    });
  });

  function triggerPad(idx, padEl) {
    padEl.classList.add('active');
    playGlyphTone(padTones[idx], 0.22, 'square');

    // Trigger associated Glyph strip
    const targetStrip = glyphStrips[idx % glyphStrips.length];
    if (targetStrip) {
      targetStrip.classList.add('active');
      setTimeout(() => targetStrip.classList.remove('active'), 200);
    }

    setTimeout(() => padEl.classList.remove('active'), 180);
  }

  // Composer Quick Action Buttons
  const btnQuickPulse = document.getElementById('btn-quick-pulse');
  if (btnQuickPulse) {
    btnQuickPulse.addEventListener('click', () => {
      runPulseWave();
      playClick(1300);
    });
  }

  const btnQuickBreach = document.getElementById('btn-quick-breach');
  if (btnQuickBreach) {
    btnQuickBreach.addEventListener('click', () => {
      runBreachAlert();
      playAlarm();
    });
  }

  // ==========================================================================
  // 7. INTERACTIVE "UNDER THE HOOD" CYBER TERMINAL
  // ==========================================================================
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const termTags = document.querySelectorAll('.term-tag');

  const COMMANDS = {
    help: `AVAILABLE COMMANDS:
- whoami      : Display operator credentials & role
- about       : Philosophy & engineering approach
- certs       : Certified technical qualifications
- goals       : IT career progression roadmap
- mindset     : Core principles & learning rules
- quote       : Jigoro Kuwajima philosophy
- scan        : Simulate network vulnerability scan
- matrix      : Pulse all glyphs & light matrix
- clear       : Wipe terminal screen`,
    
    whoami: `OPERATOR: RYOEH
ROLE: IT & Cybersecurity Student
STATUS: Learning by doing // Building strong basics
FOCUS: Networks, security, and what happens under the hood`,

    about: `ABOUT RYOEH:
Curious by nature, into cybersecurity and everything under the hood.
I like figuring things out, breaking stuff in a safe lab, and learning by doing.
I'd rather understand how something works than just know how to use it.
Currently studying IT and learning how computers talk, why flaws happen, and how to fix them.`,

    certs: `VERIFIED CERTIFICATIONS:
[1] Cambridge English B1 Preliminary
    -> English proficiency for tech docs, code, and global communication
[2] ICDL Essentials
    -> Core computer skills: operating systems, hardware, and everyday software
[3] Introduction to Cybersecurity
    -> Security basics: digital threats, safe habits, and basic defense concepts`,

    goals: `PRIMARY GOAL:
- Build strong IT and cybersecurity skills step by step.
- Build real, practical skills rather than rush to collect empty titles.`,

    mindset: `THE 4 RULES:
[1] Understand the basics first.
[2] Learn by doing, not just watching.
[3] Don't be afraid to break things in a safe lab.
[4] Focus on steady progress and solving real problems.`,

    quote: `JIGORO KUWAJIMA PHILOSOPHY:
"If you can only do one thing, hone it to perfection."`,

    matrix: `INITIATING GLYPH MATRIX PULSE...`
  };

  function printLine(text, isCommand = false, isHighlight = false) {
    if (!terminalOutput) return;
    const line = document.createElement('div');
    line.className = 'terminal-line';

    if (isCommand) {
      line.innerHTML = `<span class="terminal-prompt">operator@system:~$</span> <span class="terminal-output highlight">${escapeHtml(text)}</span>`;
    } else {
      const formatted = escapeHtml(text).replace(/\n/g, '<br>');
      line.innerHTML = `<span class="terminal-output ${isHighlight ? 'highlight' : ''}">${formatted}</span>`;
    }

    terminalOutput.appendChild(line);
    const box = document.getElementById('terminal-box');
    if (box) box.scrollTop = box.scrollHeight;
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m]));
  }

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    printLine(rawCmd, true);
    playClick(1300);

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    if (cmd === 'matrix') {
      printLine(COMMANDS.matrix, false, true);
      runPulseWave();
      setTimeout(clearGlyphInterval, 3000);
      return;
    }

    if (cmd === 'scan') {
      printLine('STARTING SIMULATED NETWORK VULNERABILITY AUDIT...');
      playAlarm();
      let step = 0;
      const targets = [
        'PORT 22/SSH   [FILTERED]  // Encrypted transport verified',
        'PORT 80/HTTP  [REDIRECT]  // TLS upgrade enforced',
        'PORT 443/HTTPS [OPEN]     // TLS 1.3 Strict-Transport-Security',
        'FIREWALL RULE [ACTIVE]   // Zero trust perimeter engaged',
        'AUDIT RESULT  [PASSED]   // Solid foundation established'
      ];
      const scanTimer = setInterval(() => {
        if (step < targets.length) {
          printLine(`> ${targets[step]}`, false, step === targets.length - 1);
          playClick(1000 + step * 100);
          step++;
        } else {
          clearInterval(scanTimer);
        }
      }, 350);
      return;
    }

    if (COMMANDS[cmd]) {
      printLine(COMMANDS[cmd]);
    } else {
      printLine(`command not found: "${cmd}". Type "help" to view all available commands.`);
    }
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = terminalInput.value;
        terminalInput.value = '';
        executeCommand(value);
      }
    });
  }

  // Quick shortcut tags
  termTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const cmd = tag.dataset.cmd;
      executeCommand(cmd);
    });
  });

  // ==========================================================================
  // 8. INTERACTIVE NOTHING SWITCHES (MINDSET CARD)
  // ==========================================================================
  const switches = document.querySelectorAll('.nothing-switch');
  switches.forEach(sw => {
    sw.addEventListener('click', () => {
      sw.classList.toggle('active');
      const isActive = sw.classList.contains('active');
      playClick(isActive ? 1400 : 700);

      // Flash corresponding glyph
      const randomStrip = glyphStrips[Math.floor(Math.random() * glyphStrips.length)];
      if (randomStrip) {
        randomStrip.classList.add('active');
        setTimeout(() => randomStrip.classList.remove('active'), 150);
      }
    });
  });

  // ==========================================================================
  // 9. TELEMETRY ACTION ON ABOUT CARD
  // ==========================================================================
  const telemetryBtn = document.getElementById('toggle-telemetry-btn');
  const aboutTelemetryView = document.getElementById('about-telemetry-view');

  if (telemetryBtn && aboutTelemetryView) {
    let telemetryMode = false;
    telemetryBtn.addEventListener('click', () => {
      telemetryMode = !telemetryMode;
      playClick(telemetryMode ? 1400 : 900);
      telemetryBtn.textContent = telemetryMode ? '[LIVE PACKETS]' : '[INSPECT]';

      if (telemetryMode) {
        aboutTelemetryView.innerHTML = `
          <div style="color: var(--accent-red); font-weight: 700; margin-bottom: 8px;">[LIVE LAB PACKET MONITOR // ACTIVE]</div>
          <div style="color: var(--text-primary);">> PACKET #1042: TCP 192.168.1.1:443 -> 192.168.1.45 [SYN, ACK]</div>
          <div style="color: var(--text-secondary);">> FIREWALL: 0 blocked threats // Port 22 filtered</div>
          <div style="color: var(--text-secondary);">> TLS 1.3: Secure handshake verified</div>
          <div style="color: var(--accent-gold); margin-top: 10px;">> ALL SYSTEMS OPERATIONAL // READY FOR WORK</div>
        `;
        playGlyphTone(700, 0.15);
      } else {
        aboutTelemetryView.innerHTML = `
          <div style="color: var(--accent-red); font-weight: 700; margin-bottom: 8px;">[SYSTEM STATUS // LAB NOTES]</div>
          <div style="color: var(--text-primary);">> OPERATOR: RYOEH</div>
          <div style="color: var(--text-secondary);">> FOCUS: Networking, cybersecurity & software basics</div>
          <div style="color: var(--text-secondary);">> RULE 1: Understand how things work under the hood</div>
          <div style="color: var(--text-secondary);">> RULE 2: Break things in a safe lab to see why they break</div>
          <div style="color: var(--text-muted); margin-top: 10px;">> STATUS: Testing, practicing, and getting better every day</div>
        `;
      }
    });
  }

  // ==========================================================================
  // 10. INTERACTIVE RYOEH CIRCULAR DOT MATRIX
  // ==========================================================================
  const dotMatrixHeadline = document.getElementById('ryoeh-dot-matrix');
  if (dotMatrixHeadline) {
    const dots = dotMatrixHeadline.querySelectorAll('.dot-cell.on');

    dots.forEach((dot, idx) => {
      dot.addEventListener('mouseenter', () => {
        playGlyphTone(520 + (idx % 7) * 70, 0.06);
      });
    });

    dotMatrixHeadline.addEventListener('click', () => {
      playClick(1500);
      dots.forEach((dot, idx) => {
        setTimeout(() => {
          dot.style.transform = 'scale(1.35)';
          dot.style.boxShadow = '0 0 16px #ffffff, 0 0 28px rgba(255,255,255,0.7)';
          setTimeout(() => {
            dot.style.transform = '';
            dot.style.boxShadow = '';
          }, 180);
        }, idx * 12);
      });
    });
  }
});
