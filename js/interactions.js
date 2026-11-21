/**
 * ===================================================================
 * A UNIVERSE MADE FOR FAMI ❤️
 * Interactive Experience Controllers & Feature Logic
 * ===================================================================
 */

class InteractionsManager {
  constructor() {
    this.discoveredSecrets = new Set();
    this.extinguishedCandles = 0;
    this.totalCandles = 3;
    this.audioContext = null;
    this.micStream = null;
    this.isMicActive = false;
    
    // Audio elements
    this.ambientAudio = new Audio();
    this.voiceAudio = new Audio();
    this.isAmbientPlaying = false;
    this.isVoicePlaying = false;

    this.init();
  }

  init() {
    this.setupPasswordGate();
    this.setupEnvelope();
    this.setupAmbientAudio();
    this.setupReasonsGrid();
    this.setupBirthdayCake();
    this.setupEternalFlower();
    this.setupVoicePlayer();
    this.setupFutureChapters();
    this.setupHiddenTreasures();
    this.setupFinalSurprise();
    this.setupGeneralScrollObserver();
  }

  // =================================================================
  // SECTION 01: PASSWORD GATE
  // =================================================================
  setupPasswordGate() {
    const passwordSection = document.getElementById('section-password');
    const form = document.getElementById('password-form');
    const input = document.getElementById('password-input');
    const errorEl = document.getElementById('password-error');
    const unlockBtn = document.getElementById('unlock-btn');

    if (!form || !input) return;

    const attemptUnlock = () => {
      const entered = input.value.trim();
      if (!entered) {
        this.showPasswordError("Please whisper the secret code...");
        return;
      }

      // Check match with isolated config
      if (entered.toLowerCase() === FAMI_CONFIG.password.correctHash.toLowerCase()) {
        // Successful unlock
        errorEl.classList.remove('show');
        input.blur();
        
        // Play subtle unlock visual
        passwordSection.classList.add('unlocked');
        
        // Starlight glow
        if (window.Universe) {
          window.Universe.illuminateStar('Gate Unlocked');
        }

        // Show Section 02: Secret Entrance
        setTimeout(() => {
          const envelopeSection = document.getElementById('section-envelope');
          if (envelopeSection) {
            envelopeSection.classList.add('active');
            if (window.Universe) {
              window.Universe.spawnShootingStar();
              setTimeout(() => window.Universe.spawnShootingStar(), 400);
              setTimeout(() => window.Universe.spawnShootingStar(), 900);
            }
          }
        }, 600);
      } else {
        // Error handling
        this.showPasswordError(FAMI_CONFIG.password.errorMessage);
        const card = document.querySelector('.password-card');
        if (card) {
          card.classList.remove('shake');
          void card.offsetWidth; // Trigger reflow
          card.classList.add('shake');
        }
      }
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      attemptUnlock();
    });

    unlockBtn.addEventListener('click', (e) => {
      e.preventDefault();
      attemptUnlock();
    });

    // Clear error on new input
    input.addEventListener('input', () => {
      errorEl.classList.remove('show');
    });
  }

  showPasswordError(msg) {
    const errorEl = document.getElementById('password-error');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('show');
    }
  }

  // =================================================================
  // SECTION 02: THE SECRET ENTRANCE (ROYAL WAX SEAL & UNFOLDING PARCHMENT)
  // =================================================================
  setupEnvelope() {
    const envelopeSection = document.getElementById('section-envelope');
    const envelopeContainer = document.getElementById('envelope-container');
    const enterUniverseBtn = document.getElementById('enter-universe-btn');
    const envelopeHint = document.getElementById('envelope-hint');
    const experienceContainer = document.getElementById('universe-experience');

    if (!envelopeContainer || !enterUniverseBtn) return;

    let isEnvelopeOpened = false;

    const openEnvelope = () => {
      if (isEnvelopeOpened) return;
      isEnvelopeOpened = true;
      envelopeContainer.classList.add('opened');
      
      if (envelopeHint) {
        envelopeHint.style.opacity = '0';
        envelopeHint.style.display = 'none';
      }

      // Spawn burst of stardust particles and hearts from wax seal
      const emojis = ['💖', '💕', '✨', '🌸', '🌟', '✦', '✧', '💗'];
      for (let i = 0; i < 28; i++) {
        setTimeout(() => {
          const sparkle = document.createElement('div');
          sparkle.className = 'celebration-sparkle';
          sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          sparkle.style.left = `${Math.random() * 60 + 20}%`;
          sparkle.style.top = `${Math.random() * 50 + 25}%`;
          sparkle.style.fontSize = `${Math.random() * 1.1 + 0.9}rem`;
          sparkle.style.color = ['#F4CADB', '#D9B8E4', '#F6E9D2', '#FFF9FC', '#ff758c'][Math.floor(Math.random() * 5)];
          envelopeContainer.appendChild(sparkle);
          setTimeout(() => sparkle.remove(), 1600);
        }, i * 35);
      }

      if (window.Universe) {
        window.Universe.illuminateStar('Royal Wax Seal Broken');
        window.Universe.spawnShootingStar();
        setTimeout(() => window.Universe.spawnShootingStar(), 500);
        setTimeout(() => window.Universe.spawnShootingStar(), 1100);
      }
    };

    envelopeContainer.addEventListener('click', openEnvelope);
    envelopeContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });

    enterUniverseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      envelopeSection.classList.add('dismissed');

      setTimeout(() => {
        envelopeSection.style.display = 'none';
        experienceContainer.classList.add('active');

        // Show the secrets tracker pill
        const trackerPill = document.getElementById('secrets-tracker-pill');
        if (trackerPill) trackerPill.classList.add('active');

        // Scroll to Section 03
        const welcomeSection = document.getElementById('section-welcome');
        if (welcomeSection) {
          welcomeSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 700);
    });

    // "Let's Begin" button in Section 03
    const beginBtn = document.getElementById('welcome-begin-btn');
    if (beginBtn) {
      beginBtn.addEventListener('click', () => {
        const storySection = document.getElementById('section-story');
        if (storySection) {
          storySection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // =================================================================
  // AMBIENT BACKGROUND MUSIC
  // =================================================================
  setupAmbientAudio() {
    const musicBtn = document.getElementById('music-toggle-btn');
    const musicStatus = document.getElementById('music-status-text');
    if (!musicBtn) return;

    this.ambientAudio.src = FAMI_CONFIG.audio.ambientMusic;
    this.ambientAudio.loop = true;
    this.ambientAudio.volume = 0.45;

    // Synthetic soft ambient pad fallback if file doesn't exist
    this.setupSyntheticAmbient();

    musicBtn.addEventListener('click', () => {
      if (this.isAmbientPlaying) {
        this.pauseAmbientAudio();
        musicBtn.classList.remove('playing');
        if (musicStatus) musicStatus.textContent = 'Music: Off';
      } else {
        this.playAmbientAudio();
        musicBtn.classList.add('playing');
        if (musicStatus) musicStatus.textContent = 'Music: On';
      }
    });
  }

  setupSyntheticAmbient() {
    // Graceful web audio synthesizer for dreamy background chords
    // when ambient-music.mp3 is not yet supplied by user
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
    } catch (e) {
      console.warn('Web Audio not supported');
    }
  }

  playAmbientAudio() {
    this.ambientAudio.play().then(() => {
      this.isAmbientPlaying = true;
    }).catch((err) => {
      // Audio file might be missing, start synthetic ethereal drone
      this.startSyntheticDream();
      this.isAmbientPlaying = true;
    });
  }

  pauseAmbientAudio() {
    this.ambientAudio.pause();
    this.stopSyntheticDream();
    this.isAmbientPlaying = false;
  }

  startSyntheticDream() {
    if (!window.AudioContext) return;
    if (!this.synthCtx) {
      this.synthCtx = new AudioContext();
    }
    if (this.synthCtx.state === 'suspended') {
      this.synthCtx.resume();
    }
    
    if (this.synthOscs) return;
    
    // Chord frequencies in Hertz (Db major 7 / romantic celestial frequency: Db, F, Ab, C)
    const freqs = [138.59, 174.61, 207.65, 261.63];
    this.synthOscs = [];
    this.synthGain = this.synthCtx.createGain();
    this.synthGain.gain.setValueAtTime(0.001, this.synthCtx.currentTime);
    this.synthGain.gain.exponentialRampToValueAtTime(0.08, this.synthCtx.currentTime + 3);
    this.synthGain.connect(this.synthCtx.destination);

    freqs.forEach((f) => {
      const osc = this.synthCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.synthCtx.currentTime);
      
      // Gentle lfo
      const lfo = this.synthCtx.createOscillator();
      lfo.frequency.value = 0.2 + Math.random() * 0.1;
      const lfoGain = this.synthCtx.createGain();
      lfoGain.gain.value = 1.5;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(this.synthGain);
      osc.start();
      this.synthOscs.push(osc, lfo);
    });
  }

  stopSyntheticDream() {
    if (this.synthGain && this.synthCtx) {
      this.synthGain.gain.exponentialRampToValueAtTime(0.0001, this.synthCtx.currentTime + 1);
      setTimeout(() => {
        if (this.synthOscs) {
          this.synthOscs.forEach(o => {
            try { o.stop(); } catch(e){}
          });
          this.synthOscs = null;
        }
      }, 1000);
    }
  }

  // =================================================================
  // SECTION 05: 23 REASONS WHY YOU'RE SPECIAL
  // =================================================================
  setupReasonsGrid() {
    const grid = document.getElementById('reasons-grid');
    if (!grid || !FAMI_CONFIG.reasons) return;

    grid.innerHTML = '';

    FAMI_CONFIG.reasons.forEach((reason) => {
      const isLast = reason.id === 23;
      const card = document.createElement('div');
      card.className = `reason-card-container reveal-on-scroll ${isLast ? 'special-last-card' : ''}`;
      card.tabIndex = 0;
      card.role = 'button';
      card.setAttribute('aria-label', `Reason ${reason.id}`);

      const formattedNum = reason.id < 10 ? `0${reason.id}` : `${reason.id}`;

      card.innerHTML = `
        <div class="reason-card-inner">
          <div class="reason-card-front glass-card">
            <span class="reason-number">${formattedNum}</span>
            <div class="card-icon-sparkle">✦</div>
            <span class="tap-hint">Tap to reveal</span>
          </div>
          <div class="reason-card-back glass-card">
            <span class="back-number">${formattedNum}</span>
            <p class="reason-text ${isLast ? 'highlighted-reason' : ''}">${reason.text}</p>
            <div class="back-sparkle">♥</div>
          </div>
        </div>
      `;

      let hasFlipped = false;
      const toggleFlip = () => {
        card.classList.toggle('flipped');
        if (!hasFlipped) {
          hasFlipped = true;
          if (window.Universe) {
            window.Universe.illuminateStar(`Reason ${reason.id}`);
          }
        }
      };

      card.addEventListener('click', toggleFlip);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFlip();
        }
      });

      grid.appendChild(card);
    });
  }

  // =================================================================
  // SECTION 06: BIRTHDAY CAKE & CANDLE EXTINGUISH
  // =================================================================
  setupBirthdayCake() {
    const candles = document.querySelectorAll('.cake-candle');
    const celebrationEl = document.getElementById('cake-celebration-msg');
    const micBtn = document.getElementById('cake-mic-btn');
    const micStatus = document.getElementById('mic-status-text');

    if (!candles.length) return;

    this.extinguishedCandles = 0;
    this.totalCandles = candles.length;

    candles.forEach((candle, idx) => {
      const extinguish = () => {
        if (candle.classList.contains('extinguished')) return;
        candle.classList.add('extinguished');
        this.extinguishedCandles++;

        // Add stardust
        if (window.Universe) {
          window.Universe.illuminateStar(`Candle ${idx + 1}`);
        }

        // Spawn a puff of smoke
        this.spawnSmokePuff(candle);

        // Check if all candles extinguished
        if (this.extinguishedCandles >= this.totalCandles) {
          this.triggerCakeCelebration();
        }
      };

      candle.addEventListener('click', extinguish);
      candle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          extinguish();
        }
      });
    });

    // Optional Microphone interaction
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (this.isMicActive) {
          this.stopMicrophone();
          if (micStatus) micStatus.textContent = 'Enable Microphone';
          micBtn.classList.remove('active');
        } else {
          this.startMicrophone(micBtn, micStatus);
        }
      });
    }
  }

  spawnSmokePuff(candle) {
    const smoke = document.createElement('div');
    smoke.className = 'smoke-particle';
    const flame = candle.querySelector('.candle-flame');
    if (flame) {
      flame.parentElement.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1200);
    }
  }

  triggerCakeCelebration() {
    const celebrationEl = document.getElementById('cake-celebration-msg');
    if (celebrationEl) {
      celebrationEl.classList.add('revealed');
    }

    // Sparkle fireworks effect
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        this.spawnSparkle();
      }, i * 60);
    }

    if (this.isMicActive) {
      this.stopMicrophone();
      const micBtn = document.getElementById('cake-mic-btn');
      const micStatus = document.getElementById('mic-status-text');
      if (micBtn) micBtn.classList.remove('active');
      if (micStatus) micStatus.textContent = 'Wished upon the stars!';
    }

    // Gently highlight the Eternal Flower stage as the birthday gift
    const flowerStage = document.getElementById('eternal-flower-stage');
    if (flowerStage) {
      setTimeout(() => {
        flowerStage.style.borderColor = 'rgba(244, 202, 219, 0.6)';
        flowerStage.style.boxShadow = '0 0 35px rgba(244, 202, 219, 0.35)';
      }, 1200);
    }
  }

  // =================================================================
  // THE ETERNAL BLOOM (3D REALISTIC INTERACTIVE FLOWER)
  // =================================================================
  setupEternalFlower() {
    const scene = document.getElementById('flower-3d-scene');
    const bud = document.getElementById('flower-bud');
    const revealCard = document.getElementById('flower-reveal-card');

    if (!scene || !bud) return;

    let isBloomed = false;

    const toggleBloom = () => {
      isBloomed = !isBloomed;
      scene.classList.toggle('bloomed', isBloomed);

      if (revealCard) {
        revealCard.classList.toggle('revealed', isBloomed);
      }

      if (isBloomed) {
        if (window.Universe) {
          window.Universe.illuminateStar('The Eternal Bloom');
        }

        // Spawn floral stardust particles
        for (let i = 0; i < 16; i++) {
          setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'celebration-sparkle';
            sparkle.textContent = ['🌸', '✨', '✦', '♥'][Math.floor(Math.random() * 4)];
            sparkle.style.left = `${Math.random() * 70 + 15}%`;
            sparkle.style.top = `${Math.random() * 60 + 10}%`;
            sparkle.style.color = ['#F4CADB', '#D9B8E4', '#F6E9D2', '#FFF9FC'][Math.floor(Math.random() * 4)];
            scene.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1600);
          }, i * 70);
        }
      }
    };

    scene.addEventListener('click', toggleBloom);
    scene.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleBloom();
      }
    });

    // 3D Tilt effect on mousemove / touchmove
    const handleTilt = (clientX, clientY) => {
      const rect = scene.getBoundingClientRect();
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;
      
      const rotX = -(y / rect.height) * 22;
      const rotY = (x / rect.width) * 22;
      bud.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${isBloomed ? 1.08 : 1})`;
    };

    scene.addEventListener('mousemove', (e) => {
      handleTilt(e.clientX, e.clientY);
    });

    scene.addEventListener('mouseleave', () => {
      bud.style.transform = '';
    });

    scene.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        handleTilt(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    scene.addEventListener('touchend', () => {
      bud.style.transform = '';
    });
  }

  spawnSparkle() {
    const cakeContainer = document.querySelector('.cake-container');
    if (!cakeContainer) return;

    const sparkle = document.createElement('div');
    sparkle.className = 'celebration-sparkle';
    sparkle.textContent = ['✦', '✧', '♥', '✨'][Math.floor(Math.random() * 4)];
    sparkle.style.left = `${Math.random() * 80 + 10}%`;
    sparkle.style.top = `${Math.random() * 60 + 20}%`;
    sparkle.style.color = ['#F4CADB', '#D9B8E4', '#F6E9D2', '#FFF9FC'][Math.floor(Math.random() * 4)];
    cakeContainer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1500);
  }

  startMicrophone(btn, status) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Microphone access is not supported on this device/browser. You can simply tap the candles to extinguish them!");
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((stream) => {
        this.micStream = stream;
        this.isMicActive = true;
        btn.classList.add('active');
        if (status) status.textContent = 'Listening... Blow on your mic!';

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const checkBlowing = () => {
          if (!this.isMicActive) {
            audioCtx.close();
            return;
          }

          analyser.getByteFrequencyData(dataArray);
          // Measure energy in low-frequency range typically caused by blowing air
          let sum = 0;
          for (let i = 0; i < 20; i++) {
            sum += dataArray[i];
          }
          const avg = sum / 20;

          if (avg > 90) { // Blow threshold
            const unlitCandles = document.querySelectorAll('.cake-candle:not(.extinguished)');
            if (unlitCandles.length > 0) {
              unlitCandles[0].click();
            }
          }

          requestAnimationFrame(checkBlowing);
        };

        requestAnimationFrame(checkBlowing);
      })
      .catch((err) => {
        console.warn("Microphone access declined or unavailable:", err);
        if (status) status.textContent = 'Tap candles to blow';
      });
  }

  stopMicrophone() {
    this.isMicActive = false;
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
  }

  // =================================================================
  // SECTION 07: VOICE MESSAGE AUDIO PLAYER
  // =================================================================
  setupVoicePlayer() {
    const playBtn = document.getElementById('voice-play-btn');
    const progressBar = document.getElementById('voice-progress-fill');
    const progressTrack = document.getElementById('voice-progress-track');
    const currentTimeEl = document.getElementById('voice-current-time');
    const totalTimeEl = document.getElementById('voice-total-time');
    const waveEl = document.getElementById('voice-waveform');
    const letterTextEl = document.getElementById('voice-letter-content');

    if (letterTextEl && FAMI_CONFIG.voiceSection) {
      letterTextEl.textContent = FAMI_CONFIG.voiceSection.letterText;
    }

    if (!playBtn) return;

    this.voiceAudio.src = FAMI_CONFIG.audio.voiceMessage;

    // Build wave bars
    if (waveEl) {
      waveEl.innerHTML = '';
      for (let i = 0; i < 28; i++) {
        const bar = document.createElement('span');
        bar.className = 'wave-bar';
        bar.style.animationDelay = `${(i * 0.08) % 1.2}s`;
        waveEl.appendChild(bar);
      }
    }

    const formatTime = (secs) => {
      if (isNaN(secs)) return '0:00';
      const m = Math.floor(secs / 60);
      const s = Math.floor(secs % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    this.voiceAudio.addEventListener('loadedmetadata', () => {
      if (totalTimeEl) totalTimeEl.textContent = formatTime(this.voiceAudio.duration);
    });

    this.voiceAudio.addEventListener('timeupdate', () => {
      if (this.voiceAudio.duration) {
        const pct = (this.voiceAudio.currentTime / this.voiceAudio.duration) * 100;
        if (progressBar) progressBar.style.width = `${pct}%`;
        if (currentTimeEl) currentTimeEl.textContent = formatTime(this.voiceAudio.currentTime);
      }
    });

    this.voiceAudio.addEventListener('ended', () => {
      this.isVoicePlaying = false;
      playBtn.classList.remove('playing');
      if (waveEl) waveEl.classList.remove('active');
      if (progressBar) progressBar.style.width = '0%';
      if (currentTimeEl) currentTimeEl.textContent = '0:00';
    });

    // Handle missing audio gracefully without breaking UI
    this.voiceAudio.addEventListener('error', () => {
      console.warn("Voice file not yet present in assets/audio/birthday-voice.mp3. Demo mode active.");
    });

    playBtn.addEventListener('click', () => {
      if (this.isVoicePlaying) {
        this.voiceAudio.pause();
        this.isVoicePlaying = false;
        playBtn.classList.remove('playing');
        if (waveEl) waveEl.classList.remove('active');
      } else {
        // Pause ambient audio while listening to voice
        if (this.isAmbientPlaying) {
          this.ambientAudio.volume = 0.15;
        }

        this.voiceAudio.play().then(() => {
          this.isVoicePlaying = true;
          playBtn.classList.add('playing');
          if (waveEl) waveEl.classList.add('active');
          if (window.Universe) {
            window.Universe.illuminateStar('Voice Message');
          }
        }).catch((err) => {
          // Mock preview play if audio file is not yet uploaded
          this.simulateVoicePlayback(playBtn, waveEl, progressBar, currentTimeEl, totalTimeEl);
        });
      }
    });

    if (progressTrack) {
      progressTrack.addEventListener('click', (e) => {
        const rect = progressTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = clickX / rect.width;
        if (this.voiceAudio.duration) {
          this.voiceAudio.currentTime = pct * this.voiceAudio.duration;
        }
      });
    }
  }

  simulateVoicePlayback(playBtn, waveEl, progressBar, currentTimeEl, totalTimeEl) {
    // Demonstration playback timer for when user hasn't added MP3 yet
    this.isVoicePlaying = true;
    playBtn.classList.add('playing');
    if (waveEl) waveEl.classList.add('active');
    if (totalTimeEl) totalTimeEl.textContent = '1:00';
    if (window.Universe) window.Universe.illuminateStar('Voice Message');

    let current = 0;
    const duration = 60;
    const interval = setInterval(() => {
      if (!this.isVoicePlaying) {
        clearInterval(interval);
        return;
      }
      current += 1;
      const pct = (current / duration) * 100;
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (currentTimeEl) currentTimeEl.textContent = `0:${current < 10 ? '0' : ''}${current}`;

      if (current >= duration) {
        clearInterval(interval);
        this.isVoicePlaying = false;
        playBtn.classList.remove('playing');
        if (waveEl) waveEl.classList.remove('active');
        if (progressBar) progressBar.style.width = '0%';
        if (currentTimeEl) currentTimeEl.textContent = '0:00';
      }
    }, 1000);
  }

  // =================================================================
  // SECTION 08: OUR UNWRITTEN CHAPTERS
  // =================================================================
  setupFutureChapters() {
    const grid = document.getElementById('future-grid');
    if (!grid || !FAMI_CONFIG.futureChapters) return;

    grid.innerHTML = '';
    
    // SVG icons for each chapter
    const iconsMap = {
      compass: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
      target: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
      coffee: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
      sparkles: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`
    };

    FAMI_CONFIG.futureChapters.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'future-card glass-card reveal-on-scroll';
      card.classList.add(`delay-${(index + 1) * 100}`);

      card.innerHTML = `
        <div class="future-icon-wrapper">
          ${iconsMap[item.icon] || iconsMap.sparkles}
        </div>
        <h3 class="future-card-title">${item.title}</h3>
        <p class="future-card-desc">${item.description}</p>
      `;

      card.addEventListener('click', () => {
        if (window.Universe) {
          window.Universe.illuminateStar(`Future: ${item.title}`);
        }
      });

      grid.appendChild(card);
    });
  }

  // =================================================================
  // SECTION 09: HIDDEN TREASURES (5 SYMBOLS)
  // =================================================================
  setupHiddenTreasures() {
    const modal = document.getElementById('secret-modal');
    const modalIcon = document.getElementById('secret-modal-icon');
    const modalTitle = document.getElementById('secret-modal-title');
    const modalText = document.getElementById('secret-modal-text');
    const modalClose = document.getElementById('secret-modal-close');
    const trackerCount = document.getElementById('tracker-count');

    const openSecretModal = (treasure) => {
      modalIcon.textContent = treasure.symbol;
      modalTitle.textContent = treasure.name;
      modalText.textContent = treasure.secret;
      modal.classList.add('active');
    };

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    // Find all hidden-symbol elements placed throughout the DOM
    document.querySelectorAll('.hidden-symbol').forEach((el) => {
      const id = el.dataset.treasureId;
      const treasure = FAMI_CONFIG.hiddenTreasures.find(t => t.id === id);

      el.addEventListener('click', () => {
        if (!treasure) return;
        el.classList.add('discovered');

        if (!this.discoveredSecrets.has(id)) {
          this.discoveredSecrets.add(id);
          if (trackerCount) {
            trackerCount.textContent = `${this.discoveredSecrets.size}/5`;
          }
          if (window.Universe) {
            window.Universe.illuminateStar(`Secret: ${treasure.name}`);
          }
        }

        // If all 5 discovered, reveal grand master revelation
        if (this.discoveredSecrets.size === 5) {
          setTimeout(() => {
            modalIcon.textContent = '✦ 5/5 ✦';
            modalTitle.textContent = "You Found All My Little Secrets!";
            modalText.innerHTML = `
              <p style="margin-bottom: 0.8rem; font-style: italic; color: #F4CADB;">"But here's one secret that was never hidden..."</p>
              <p style="font-size: 1.25rem; font-weight: 500; color: #FFF9FC;">"You are one of my life's most beautiful gifts."</p>
            `;
            modal.classList.add('active');
          }, 400);
        } else {
          openSecretModal(treasure);
        }
      });
    });
  }

  // =================================================================
  // SECTION 10: THE FINAL SURPRISE & REPLAY
  // =================================================================
  setupFinalSurprise() {
    const section = document.getElementById('section-final');
    const replayBtn = document.getElementById('replay-universe-btn');
    const finalLetter = document.getElementById('final-letter-content');

    if (finalLetter && FAMI_CONFIG.finalSurprise) {
      finalLetter.textContent = FAMI_CONFIG.finalSurprise.letter;
    }

    if (!section) return;

    // Observe when user reaches Section 10
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('climax-active');
          document.body.classList.add('universe-climax');
          if (window.Universe) {
            window.Universe.triggerClimax();
          }
        }
      });
    }, { threshold: 0.25 });

    observer.observe(section);

    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        document.body.classList.remove('universe-climax');
        if (window.Universe) {
          window.Universe.resetClimax();
        }
        
        // Scroll smoothly back to Section 03 (Welcome)
        const welcomeSection = document.getElementById('section-welcome');
        if (welcomeSection) {
          welcomeSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // Generic Reveal on Scroll Observer
  setupGeneralScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }
}
