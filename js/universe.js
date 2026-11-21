/**
 * ===================================================================
 * A UNIVERSE MADE FOR FAMI ❤️
 * Canvas Starfield & "The Little Universe Remembers" Engine
 * ===================================================================
 */

class UniverseEngine {
  constructor() {
    this.canvas = document.getElementById('universe-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Stars collection
    this.stars = [];
    this.starCount = window.innerWidth < 768 ? 90 : 160;

    // Discovered constellation stars ("The Little Universe Remembers")
    this.illuminatedStars = [];
    this.maxConstellationPoints = 23; // Reflecting the 23 milestones/reasons
    this.totalDiscovered = 0;
    
    // Heart Constellation shape points (normalized -1 to 1)
    this.constellationShape = [];
    this.initHeartShape();

    // Petals
    this.petals = [];
    this.maxPetals = window.innerWidth < 768 ? 12 : 22;

    // Shooting Stars Engine
    this.shootingStars = [];
    this.shootingStarInterval = 90; // frames
    this.shootingStarTimer = 0;

    // State
    this.isRunning = true;
    this.climaxMode = false;
    this.climaxProgress = 0;

    this.initCanvas();
    this.initStars();
    this.initPetals();
    this.bindEvents();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  initCanvas() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  initHeartShape() {
    // Generate normalized points for heart constellation:
    // x = 16 * sin^3(t)
    // y = -(13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t))
    this.constellationShape = [];
    const count = this.maxConstellationPoints;
    for (let i = 0; i < count; i++) {
      const t = (Math.PI * 2 * i) / count;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      // Normalize to around -0.5 to 0.5 range
      this.constellationShape.push({
        nx: x / 36,
        ny: y / 36,
        lit: false,
        pulse: Math.random() * Math.PI,
        color: i % 2 === 0 ? '#F4CADB' : '#D9B8E4'
      });
    }
  }

  initStars() {
    this.stars = [];
    const colors = ['#FFF9FC', '#D9B8E4', '#F4CADB', '#F6E9D2'];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06
      });
    }
  }

  initPetals() {
    this.petals = [];
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }
  }

  createPetal(initial = false) {
    return {
      x: Math.random() * this.width,
      y: initial ? Math.random() * this.height : -20,
      size: Math.random() * 6 + 4,
      speedY: Math.random() * 0.5 + 0.3,
      speedX: Math.sin(Math.random() * Math.PI) * 0.4 + 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.35 + 0.15,
      color: Math.random() > 0.4 ? 'rgba(244, 202, 219, ' : 'rgba(217, 184, 228, '
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.initCanvas();
      this.initStars();
    });

    document.addEventListener('visibilitychange', () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) {
        requestAnimationFrame(this.loop);
      }
    });
  }

  spawnShootingStar() {
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25; // ~45 deg diagonal
    const speed = Math.random() * 8 + 14;
    this.shootingStars.push({
      x: Math.random() * (this.width * 0.9),
      y: Math.random() * (this.height * 0.4),
      length: Math.random() * 80 + 110,
      speed: speed,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      opacity: 1,
      fadeSpeed: Math.random() * 0.018 + 0.012,
      thickness: Math.random() * 1.5 + 1.2
    });
  }

  /**
   * Signature Feature: "The Little Universe Remembers"
   * Called whenever user triggers an interaction:
   * - Viewing a timeline memory
   * - Flipping a reason card
   * - Finding a hidden secret
   */
  illuminateStar(label = "") {
    if (this.totalDiscovered < this.maxConstellationPoints) {
      this.constellationShape[this.totalDiscovered].lit = true;
      this.totalDiscovered++;
      this.updateConstellationMeter();
      this.spawnFloatingStardust();
    }
  }

  updateConstellationMeter() {
    const meter = document.getElementById('constellation-meter');
    const countEl = document.getElementById('meter-discovered-count');
    if (meter && countEl) {
      meter.classList.add('visible');
      countEl.textContent = `${this.totalDiscovered}/${this.maxConstellationPoints}`;
      
      const dotsContainer = meter.querySelector('.dots-container');
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < this.maxConstellationPoints; i++) {
          const dot = document.createElement('span');
          dot.className = `star-dot ${i < this.totalDiscovered ? 'lit' : ''}`;
          dotsContainer.appendChild(dot);
        }
      }
    }
  }

  spawnFloatingStardust() {
    // Light pulse trigger
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '20px';
    flash.style.right = '20px';
    flash.style.width = '6px';
    flash.style.height = '6px';
    flash.style.borderRadius = '50%';
    flash.style.background = '#FFF9FC';
    flash.style.boxShadow = '0 0 20px #D9B8E4, 0 0 35px #F4CADB';
    flash.style.zIndex = '999';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'all 1s ease-out';
    document.body.appendChild(flash);
    setTimeout(() => {
      flash.style.transform = 'scale(4)';
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 1000);
    }, 20);
  }

  triggerClimax() {
    this.climaxMode = true;
    // Light all remaining stars for the climax
    for (let point of this.constellationShape) {
      point.lit = true;
    }
  }

  resetClimax() {
    this.climaxMode = false;
    this.climaxProgress = 0;
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw twinkling background stars
    for (let star of this.stars) {
      star.twinklePhase += star.twinkleSpeed;
      const alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.3;
      const finalAlpha = Math.max(0.1, Math.min(1, alpha));

      star.x += star.vx;
      star.y += star.vy;
      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;

      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = finalAlpha;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 2. Draw drifting flower petals
    for (let petal of this.petals) {
      petal.y += petal.speedY;
      petal.x += petal.speedX;
      petal.rotation += petal.rotationSpeed;

      if (petal.y > this.height + 20) {
        Object.assign(petal, this.createPetal(false));
      }

      this.ctx.save();
      this.ctx.translate(petal.x, petal.y);
      this.ctx.rotate(petal.rotation);
      this.ctx.fillStyle = `${petal.color}${petal.opacity})`;
      this.ctx.beginPath();
      // Elliptical petal shape
      this.ctx.ellipse(0, 0, petal.size * 0.6, petal.size, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2.5 Draw Shooting Stars
    this.shootingStarTimer++;
    if (this.shootingStarTimer > this.shootingStarInterval) {
      this.shootingStarTimer = 0;
      this.spawnShootingStar();
      if (Math.random() > 0.5) {
        setTimeout(() => this.spawnShootingStar(), 250);
      }
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const star = this.shootingStars[i];
      star.x += star.vx;
      star.y += star.vy;
      star.opacity -= star.fadeSpeed;

      if (star.opacity <= 0 || star.x > this.width + 150 || star.y > this.height + 150) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      const tailX = star.x - (star.vx / star.speed) * star.length;
      const tailY = star.y - (star.vy / star.speed) * star.length;

      const grad = this.ctx.createLinearGradient(star.x, star.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 249, 252, ${star.opacity})`);
      grad.addColorStop(0.25, `rgba(244, 202, 219, ${star.opacity * 0.85})`);
      grad.addColorStop(0.65, `rgba(217, 184, 228, ${star.opacity * 0.4})`);
      grad.addColorStop(1, `rgba(36, 27, 53, 0)`);

      this.ctx.save();
      this.ctx.lineWidth = star.thickness;
      this.ctx.strokeStyle = grad;
      this.ctx.beginPath();
      this.ctx.moveTo(star.x, star.y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.stroke();

      // Bright star head
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.thickness * 1.3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. Draw The Discovered Star Constellation
    const centerX = this.width * 0.5;
    // Position constellation dynamically based on scroll or center in climax
    const centerY = this.climaxMode ? this.height * 0.42 : this.height * 0.28;
    const scale = Math.min(this.width, this.height) * 0.45;

    // Draw connecting lines between lit constellation nodes
    this.ctx.lineWidth = 1.2;
    this.ctx.strokeStyle = this.climaxMode ? 'rgba(244, 202, 219, 0.45)' : 'rgba(217, 184, 228, 0.22)';
    this.ctx.beginPath();
    let firstLit = null;
    let prevLit = null;

    for (let i = 0; i < this.constellationShape.length; i++) {
      const p = this.constellationShape[i];
      if (p.lit) {
        const px = centerX + p.nx * scale;
        const py = centerY + p.ny * scale;
        if (!firstLit) firstLit = { x: px, y: py };
        if (prevLit) {
          this.ctx.lineTo(px, py);
        } else {
          this.ctx.moveTo(px, py);
        }
        prevLit = { x: px, y: py };
      }
    }
    // In climax, complete the loop if all are lit
    if (this.climaxMode && firstLit && prevLit) {
      this.ctx.lineTo(firstLit.x, firstLit.y);
    }
    this.ctx.stroke();

    // Draw illuminated star nodes
    for (let i = 0; i < this.constellationShape.length; i++) {
      const p = this.constellationShape[i];
      if (p.lit) {
        p.pulse += 0.04;
        const px = centerX + p.nx * scale;
        const py = centerY + p.ny * scale;
        const pulseSize = 2.4 + Math.sin(p.pulse) * 0.8;

        // Outer glow
        const glow = this.ctx.createRadialGradient(px, py, 0, px, py, pulseSize * 4.5);
        glow.addColorStop(0, p.color);
        glow.addColorStop(0.5, 'rgba(217, 184, 228, 0.35)');
        glow.addColorStop(1, 'rgba(36, 27, 53, 0)');

        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.arc(px, py, pulseSize * 4.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Core star
        this.ctx.fillStyle = '#FFF9FC';
        this.ctx.globalAlpha = 1;
        this.ctx.beginPath();
        this.ctx.arc(px, py, pulseSize, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(this.loop);
  }
}

// Global instance
window.Universe = null;
document.addEventListener('DOMContentLoaded', () => {
  window.Universe = new UniverseEngine();
});
