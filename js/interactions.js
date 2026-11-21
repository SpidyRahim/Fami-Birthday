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
    this.setupFairyDustTrail();
    this.setupPasswordGate();
    this.setupEnvelope();
    this.setupJourneyCounter();
    this.setupAmbientAudio();
    this.setupReasonsGrid();
    this.setupBirthdayCake();
    this.setupEternalFlower();
    this.setupGiftBox();
    this.setupVoicePlayer();
    this.setupFutureChapters();
    this.setupScratchCard();
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
    const micBtn = document.getElementById('cake-mic-btn');
    const micStatus = document.getElementById('mic-status-text');

    if (!candles.length) return;

    this.extinguishedCandles = 0;
    this.totalCandles = candles.length;

    candles.forEach((candle, idx) => {
      let triggered = false;
      const handleExtinguish = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (triggered || candle.classList.contains('extinguished')) return;
        triggered = true;
        this.extinguishCandle(candle, idx);
      };

      candle.addEventListener('click', handleExtinguish);
      candle.addEventListener('pointerdown', handleExtinguish);
      candle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleExtinguish(e);
        }
      });
    });

    // Also support tapping anywhere in the candles row or near the flame to extinguish the next candle
    const candlesRow = document.querySelector('.candles-row');
    if (candlesRow) {
      candlesRow.addEventListener('click', (e) => {
        const unlit = document.querySelectorAll('.cake-candle:not(.extinguished)');
        if (unlit.length > 0) {
          this.extinguishCandle(unlit[0]);
        }
      });
    }

    // Optional Microphone interaction
    if (micBtn) {
      micBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
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

  extinguishCandle(candle, idx) {
    if (!candle || candle.classList.contains('extinguished')) return;
    candle.classList.add('extinguished');
    this.extinguishedCandles = (this.extinguishedCandles || 0) + 1;

    // Add stardust to constellation
    if (window.Universe) {
      window.Universe.illuminateStar(`Candle ${idx !== undefined ? idx + 1 : ''}`);
      window.Universe.spawnShootingStar();
    }

    // Spawn a puff of smoke
    this.spawnSmokePuff(candle);

    // Check if all candles extinguished
    const total = document.querySelectorAll('.cake-candle').length || 3;
    if (this.extinguishedCandles >= total) {
      this.triggerCakeCelebration();
    }
  }

  spawnSmokePuff(candle) {
    const smoke = document.createElement('div');
    smoke.className = 'smoke-particle';
    candle.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1400);
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
      if (status) status.textContent = 'Mic unavailable • Tap candles!';
      alert("Microphone access is not supported on this device/browser. You can simply tap the candles to extinguish them!");
      return;
    }

    // Disable AEC / Noise suppression so breath/blowing sound is not cancelled by the browser
    navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      },
      video: false
    })
      .then(async (stream) => {
        this.micStream = stream;
        this.isMicActive = true;
        btn.classList.add('active');
        if (status) status.textContent = 'Listening... Blow on your mic now! 🌬️';

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContextClass();
        if (audioCtx.state === 'suspended') {
          await audioCtx.resume();
        }

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.3;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const freqData = new Uint8Array(analyser.frequencyBinCount);
        const timeData = new Uint8Array(analyser.fftSize);
        let lastBlowTime = 0;

        const checkBlowing = () => {
          if (!this.isMicActive) {
            try { audioCtx.close(); } catch (e) {}
            return;
          }

          analyser.getByteFrequencyData(freqData);
          analyser.getByteTimeDomainData(timeData);

          // 1. Measure low frequency rumble (characteristic of air puff / blowing on mic)
          let lowSum = 0;
          const lowBins = Math.min(18, freqData.length);
          for (let i = 0; i < lowBins; i++) {
            lowSum += freqData[i];
          }
          const lowAvg = lowSum / lowBins;

          // 2. Measure raw peak amplitude in time domain
          let maxDev = 0;
          for (let i = 0; i < timeData.length; i++) {
            const dev = Math.abs(timeData[i] - 128);
            if (dev > maxDev) maxDev = dev;
          }

          // Blow condition: either strong low-frequency rumble or sudden acoustic puff
          if (lowAvg > 30 || maxDev > 20) {
            const now = Date.now();
            if (now - lastBlowTime > 350) { // pleasant sequential extinguish
              lastBlowTime = now;
              const unlitCandles = document.querySelectorAll('.cake-candle:not(.extinguished)');
              if (unlitCandles.length > 0) {
                this.extinguishCandle(unlitCandles[0]);
              }
            }
          }

          requestAnimationFrame(checkBlowing);
        };

        requestAnimationFrame(checkBlowing);
      })
      .catch((err) => {
        console.warn("Microphone access declined or unavailable:", err);
        if (status) status.textContent = 'Mic blocked • Tap candles to blow!';
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

  // =================================================================
  // FEATURE 1: FAIRY DUST MAGIC WAND (GLOBAL TOUCH/POINTER TRAIL)
  // =================================================================
  setupFairyDustTrail() {
    let lastTime = 0;
    const dustIcons = ['💖', '✨', '🌸', '💕', '✦', '✧', '💗'];
    
    const spawnParticle = (x, y) => {
      const now = Date.now();
      if (now - lastTime < 45) return; // throttle 45ms for smooth performance
      lastTime = now;

      const p = document.createElement('span');
      p.className = 'fairy-dust-particle';
      p.textContent = dustIcons[Math.floor(Math.random() * dustIcons.length)];
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.fontSize = `${Math.random() * 0.7 + 0.75}rem`;
      p.style.color = ['#F4CADB', '#D9B8E4', '#F6E9D2', '#FFF9FC', '#ff758c', '#ffd166'][Math.floor(Math.random() * 6)];
      p.style.filter = 'drop-shadow(0 0 6px rgba(244, 202, 219, 0.8))';
      document.body.appendChild(p);

      setTimeout(() => {
        p.remove();
      }, 850);
    };

    window.addEventListener('pointermove', (e) => {
      spawnParticle(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        spawnParticle(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  }

  // =================================================================
  // FEATURE 2: THE JOURNEY OF US (LIVE TIME TOGETHER COUNTER)
  // =================================================================
  setupJourneyCounter() {
    const daysEl = document.getElementById('counter-days');
    const hoursEl = document.getElementById('counter-hours');
    const minEl = document.getElementById('counter-minutes');
    const secEl = document.getElementById('counter-seconds');
    const milestoneEl = document.getElementById('counter-milestone-text');

    if (!daysEl || !hoursEl || !minEl || !secEl) return;

    const startDate = new Date(FAMI_CONFIG.journeyCounter?.startDate || "2019-08-14T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, now - startDate);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = days.toLocaleString();
      hoursEl.textContent = String(hours).padStart(2, '0');
      minEl.textContent = String(minutes).padStart(2, '0');
      secEl.textContent = String(seconds).padStart(2, '0');

      if (milestoneEl) {
        const totalHours = Math.floor(diff / (1000 * 60 * 60)).toLocaleString();
        milestoneEl.innerHTML = `Over <strong>${days.toLocaleString()}</strong> days & <strong>${totalHours}</strong> hours of smiles, late night talks, and warm memories.`;
      }
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // =================================================================
  // FEATURE 3: VIRTUAL 3D GIFT BOX & LOVE COUPONS
  // =================================================================
  setupGiftBox() {
    const giftBox = document.getElementById('gift-box-container');
    const giftHint = document.getElementById('gift-tap-hint');
    const showcase = document.getElementById('coupons-showcase');
    const couponsGrid = document.getElementById('coupons-grid');

    if (!giftBox || !couponsGrid) return;

    let isOpened = false;

    // Populate coupons from config
    const coupons = FAMI_CONFIG.giftBox?.coupons || [];
    couponsGrid.innerHTML = coupons.map((c, i) => `
      <div class="coupon-card" style="animation-delay: ${i * 0.12}s;">
        <span class="coupon-badge">${c.badge}</span>
        <div class="coupon-icon">${c.icon}</div>
        <div>
          <h3 class="coupon-title">${c.title}</h3>
          <p class="coupon-desc">${c.desc}</p>
        </div>
        <button type="button" class="coupon-claim-btn" data-coupon-id="${c.id}">
          Claim This Coupon ✨
        </button>
      </div>
    `).join('');

    // Handle coupon claims
    couponsGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.coupon-claim-btn');
      if (!btn) return;

      const card = btn.closest('.coupon-card');
      if (!card || card.querySelector('.coupon-stamp')) return;

      btn.style.display = 'none';
      const stamp = document.createElement('div');
      stamp.className = 'coupon-stamp';
      stamp.innerHTML = 'CLAIMED ❤️';
      card.appendChild(stamp);

      // Spawn stardust
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          const sparkle = document.createElement('div');
          sparkle.className = 'celebration-sparkle';
          sparkle.textContent = ['💖', '✨', '🌸', '💕'][Math.floor(Math.random() * 4)];
          sparkle.style.left = `${Math.random() * 80 + 10}%`;
          sparkle.style.top = `${Math.random() * 60 + 20}%`;
          card.appendChild(sparkle);
          setTimeout(() => sparkle.remove(), 1200);
        }, i * 30);
      }

      if (window.Universe) {
        window.Universe.illuminateStar('Love Coupon Claimed');
      }
    });

    const openGift = () => {
      if (isOpened) return;
      isOpened = true;
      giftBox.classList.add('opened');

      if (giftHint) {
        giftHint.textContent = '🎉 Your Gift is Unwrapped! Look at your exclusive coupons below! 🎉';
        giftHint.style.color = '#ffd166';
      }

      // Explosion of celebration sparkles from the box
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const sparkle = document.createElement('div');
          sparkle.className = 'celebration-sparkle';
          sparkle.textContent = ['🎉', '💖', '✨', '🌸', '🎁', '💕', '🌟'][Math.floor(Math.random() * 7)];
          sparkle.style.left = `${Math.random() * 80 + 10}%`;
          sparkle.style.top = `${Math.random() * 60 + 20}%`;
          sparkle.style.fontSize = `${Math.random() * 1.2 + 0.9}rem`;
          giftBox.appendChild(sparkle);
          setTimeout(() => sparkle.remove(), 1600);
        }, i * 35);
      }

      if (window.Universe) {
        window.Universe.illuminateStar('Birthday Gift Unwrapped');
        window.Universe.spawnShootingStar();
      }

      setTimeout(() => {
        if (showcase) {
          showcase.classList.add('visible');
          showcase.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 700);
    };

    giftBox.addEventListener('click', openGift);
    giftBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGift();
      }
    });
  }

  // =================================================================
  // FEATURE 4: GOLDEN SCRATCH CARD SECRET
  // =================================================================
  setupScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    const container = document.getElementById('scratch-container');
    const statusText = document.getElementById('scratch-status-text');
    const revealBtn = document.getElementById('scratch-reveal-all-btn');

    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let isDrawing = false;
    let isRevealed = false;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = container.offsetWidth || 400;
      height = container.offsetHeight || 380;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      drawFoil();
    };

    const drawFoil = () => {
      // Golden Foil Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#c59b27');
      grad.addColorStop(0.25, '#f4d068');
      grad.addColorStop(0.5, '#e5b83b');
      grad.addColorStop(0.75, '#fff1a8');
      grad.addColorStop(1, '#b8860b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Golden Stardust Specks
      for (let i = 0; i < 350; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.65)' : 'rgba(160, 100, 15, 0.45)';
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Border inside foil
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(12, 12, width - 24, height - 24);

      // Center Prompt Text
      ctx.fillStyle = '#4a2d04';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨ Scratch Here With Love ✨', width / 2, height / 2 - 12);

      ctx.fillStyle = '#6e450b';
      ctx.font = 'italic 13px Inter, sans-serif';
      ctx.fillText('(Use finger or mouse)', width / 2, height / 2 + 14);
    };

    // Defer resize until DOM is laid out
    setTimeout(resize, 200);
    window.addEventListener('resize', () => {
      if (!isRevealed) resize();
    });

    const scratch = (clientX, clientY) => {
      if (isRevealed) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();

      // Check progress every few scratches
      checkProgress();
    };

    let checkThrottle = 0;
    const checkProgress = () => {
      checkThrottle++;
      if (checkThrottle % 15 !== 0) return;

      try {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const imgData = ctx.getImageData(0, 0, width * dpr, height * dpr);
        const data = imgData.data;
        let clearPixels = 0;
        const totalSampled = Math.floor(data.length / 32);

        for (let i = 3; i < data.length; i += 32) { // sample every 8th pixel
          if (data[i] === 0) clearPixels++;
        }

        const percent = Math.min(100, Math.round((clearPixels / totalSampled) * 100));
        if (statusText) {
          statusText.textContent = `Secret Revealed: ${percent}%`;
        }

        if (percent > 42) {
          revealEntireSecret();
        }
      } catch (err) {
        // Cross-origin fallback safety
      }
    };

    const revealEntireSecret = () => {
      if (isRevealed) return;
      isRevealed = true;
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';

      if (statusText) {
        statusText.textContent = '✨ Secret Unlocked with Love ✨';
        statusText.style.color = '#ffd166';
      }
      if (revealBtn) {
        revealBtn.style.display = 'none';
      }

      if (window.Universe) {
        window.Universe.illuminateStar('Golden Scratch Secret Revealed');
        window.Universe.spawnShootingStar();
      }
    };

    // Mouse Events
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      scratch(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', (e) => {
      if (isDrawing) scratch(e.clientX, e.clientY);
    });

    // Touch Events
    canvas.addEventListener('touchstart', (e) => {
      isDrawing = true;
      if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', (e) => {
      if (isDrawing && e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    if (revealBtn) {
      revealBtn.addEventListener('click', revealEntireSecret);
    }
  }
}
