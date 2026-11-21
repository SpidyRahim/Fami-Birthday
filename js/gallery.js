/**
 * ===================================================================
 * A UNIVERSE MADE FOR FAMI ❤️
 * 3D Celestial Orbit Gallery Engine
 * ===================================================================
 * Dynamically detects 1.jpg, 2.jpg, 3.jpg ... in assets/images/gallery/
 * Automatically calculates angles and radius for any number of photos.
 * Supports smooth auto-rotation, touch swipe, drag, card tap, and modal zoom.
 */

class OrbitGallery {
  constructor() {
    this.carousel = document.getElementById('orbit-carousel');
    this.viewport = document.querySelector('.orbit-gallery-viewport');
    this.prevBtn = document.getElementById('orbit-prev-btn');
    this.nextBtn = document.getElementById('orbit-next-btn');
    this.pauseBtn = document.getElementById('orbit-pause-btn');
    this.pauseText = document.getElementById('orbit-pause-text');

    if (!this.carousel) return;

    this.photos = [];
    this.cards = [];
    this.currentAngle = 0;
    this.targetAngle = 0;
    this.cardCount = 0;
    this.radius = 320;
    
    // Auto-rotation state
    this.isRotating = true;
    this.rotationSpeed = 0.2; // degrees per frame
    
    // Drag & Touch interaction state
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.dragStartAngle = 0;
    this.velocity = 0;
    this.lastTouchX = 0;
    this.lastTouchTime = 0;

    this.init();
  }

  async init() {
    this.adjustRadiusForScreen();
    window.addEventListener('resize', () => {
      this.adjustRadiusForScreen();
      this.positionCards();
    });

    // Scan for photos in assets/images/gallery/
    await this.scanGalleryPhotos();
    
    if (this.photos.length === 0) {
      this.loadDefaultPlaceholders();
    }

    this.renderCards();
    this.bindEvents();
    this.animate();
  }

  adjustRadiusForScreen() {
    const w = window.innerWidth;
    if (w < 480) {
      this.radius = Math.max(160, Math.min(220, w * 0.45));
    } else if (w < 768) {
      this.radius = 240;
    } else if (w < 1024) {
      this.radius = 300;
    } else {
      this.radius = 360;
    }
  }

  /**
   * Smart sequential probe: checks 1.jpg, 2.jpg, 3.jpg... in assets/images/gallery/
   * Tests multiple extensions (.jpg, .jpeg, .png, .webp) for each number.
   */
  async scanGalleryPhotos() {
    const maxScan = 50; // supports up to 50 photos automatically
    const extensions = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'PNG', 'JPEG'];
    const detected = [];

    const checkImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    };

    for (let i = 1; i <= maxScan; i++) {
      let found = false;
      for (const ext of extensions) {
        const path = `assets/images/gallery/${i}.${ext}`;
        const exists = await checkImage(path);
        if (exists) {
          detected.push({
            id: i,
            src: path,
            title: `Memory #${i < 10 ? '0' + i : i}`,
            caption: `A cherished moment with Fami`
          });
          found = true;
          break;
        }
      }

      // If a number in sequence is missing, check if the very next one exists (in case user accidentally skipped a number)
      if (!found) {
        let skipFound = false;
        if (i <= 3) {
          // If 1 is not found, stop immediately (folder is empty)
          break;
        }
        // Try probing next number just in case
        for (const ext of extensions) {
          const nextPath = `assets/images/gallery/${i + 1}.${ext}`;
          if (await checkImage(nextPath)) {
            skipFound = true;
            break;
          }
        }
        if (!skipFound) {
          break;
        }
      }
    }

    this.photos = detected;
  }

  /**
   * Fallback: If user hasn't dropped images yet, render 6 romantic aesthetic placeholders
   */
  loadDefaultPlaceholders() {
    const titles = [
      "Starlit Smile",
      "Gentle Whispers",
      "Golden Moments",
      "Sweet Laughter",
      "Serenade of Stars",
      "Endless Love"
    ];

    for (let i = 1; i <= 6; i++) {
      this.photos.push({
        id: i,
        src: `assets/images/memories/memory-${((i - 1) % 5) + 1}.svg`,
        title: titles[i - 1] || `Memory #${i}`,
        caption: `Upload your photos as ${i}.jpg in assets/images/gallery/ to appear here!`
      });
    }
  }

  renderCards() {
    this.carousel.innerHTML = '';
    this.cards = [];
    this.cardCount = this.photos.length;

    if (this.cardCount === 0) return;

    // Angle step between cards
    this.angleStep = 360 / this.cardCount;

    this.photos.forEach((photo, index) => {
      const card = document.createElement('div');
      card.className = 'orbit-card glass-card';
      card.dataset.index = index;
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${photo.title}: Click to view`);

      card.innerHTML = `
        <div class="orbit-card-media">
          <img src="${photo.src}" alt="${photo.title}" loading="lazy" />
          <div class="orbit-card-overlay">
            <span class="orbit-view-badge">View</span>
          </div>
        </div>
        <div class="orbit-card-info">
          <span class="orbit-card-title">${photo.title}</span>
        </div>
      `;

      // Tap on card: if already in front, open fullscreen modal; if not in front, rotate to front!
      card.addEventListener('click', (e) => {
        const isCurrentFront = this.isCardInFront(index);
        if (isCurrentFront) {
          this.openPhotoModal(photo);
        } else {
          this.rotateToIndex(index);
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openPhotoModal(photo);
        }
      });

      this.carousel.appendChild(card);
      this.cards.push(card);
    });

    this.positionCards();
  }

  positionCards() {
    if (!this.cards.length) return;
    const count = this.cards.length;
    const step = 360 / count;

    // Scale card dimensions dynamically if many photos
    const cardWidth = window.innerWidth < 480 ? 120 : (count > 16 ? 160 : 190);
    const cardHeight = window.innerWidth < 480 ? 170 : (count > 16 ? 220 : 260);

    this.carousel.style.width = `${cardWidth}px`;
    this.carousel.style.height = `${cardHeight}px`;

    this.cards.forEach((card, index) => {
      const cardAngle = index * step;
      card.dataset.baseAngle = cardAngle;
      // 3D placement around circle
      card.style.transform = `rotateY(${cardAngle}deg) translateZ(${this.radius}px)`;
    });
  }

  isCardInFront(index) {
    // Determine which card is closest to the 0 deg viewing angle
    const step = 360 / this.cardCount;
    const cardAngle = (index * step + this.currentAngle) % 360;
    const normalized = (cardAngle + 360) % 360;
    return normalized < 25 || normalized > 335;
  }

  rotateToIndex(index) {
    const step = 360 / this.cardCount;
    // Calculate nearest rotation to bring card to 0 degrees
    let target = -index * step;
    
    // Normalize targetAngle difference to prevent multi-spin jumps
    const currentNorm = this.targetAngle;
    const diff = (target - (currentNorm % 360) + 540) % 360 - 180;
    this.targetAngle = currentNorm + diff;

    if (window.Universe) {
      window.Universe.illuminateStar(`Orbit Photo #${index + 1}`);
    }
  }

  openPhotoModal(photo) {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-photo-img');
    const modalCaption = document.getElementById('modal-photo-caption');
    const modalDate = document.getElementById('modal-photo-date');

    if (!modal || !modalImg) return;

    modalImg.src = photo.src;
    if (modalCaption) modalCaption.textContent = photo.caption;
    if (modalDate) modalDate.textContent = photo.title;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.Universe) {
      window.Universe.illuminateStar(photo.title);
    }
  }

  bindEvents() {
    // Navigation Buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.targetAngle += this.angleStep || 40;
        this.triggerInteractionHaptic();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.targetAngle -= this.angleStep || 40;
        this.triggerInteractionHaptic();
      });
    }

    // Play/Pause Auto-rotation
    if (this.pauseBtn) {
      this.pauseBtn.addEventListener('click', () => {
        this.isRotating = !this.isRotating;
        if (this.pauseText) {
          this.pauseText.textContent = this.isRotating ? 'Pause Rotation' : 'Resume Rotation';
        }
        this.pauseBtn.classList.toggle('paused', !this.isRotating);
      });
    }

    // Touch & Drag Handling on Viewport
    if (!this.viewport) return;

    // Mouse Events
    this.viewport.addEventListener('mousedown', (e) => this.onDragStart(e.clientX));
    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) this.onDragMove(e.clientX);
    });
    window.addEventListener('mouseup', () => {
      if (this.isDragging) this.onDragEnd();
    });

    // Touch Events (Mobile)
    this.viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.onDragStart(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        this.onDragMove(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (this.isDragging) this.onDragEnd();
    });

    // Pause rotation temporarily on hover
    this.viewport.addEventListener('mouseenter', () => {
      this.isHovered = true;
    });
    this.viewport.addEventListener('mouseleave', () => {
      this.isHovered = false;
    });
  }

  onDragStart(clientX) {
    this.isDragging = true;
    this.startX = clientX;
    this.currentX = clientX;
    this.dragStartAngle = this.targetAngle;
    this.velocity = 0;
    this.lastTouchX = clientX;
    this.lastTouchTime = performance.now();
  }

  onDragMove(clientX) {
    const deltaX = clientX - this.startX;
    // Scale sensitivity based on screen width
    const sensitivity = window.innerWidth < 480 ? 0.38 : 0.28;
    this.targetAngle = this.dragStartAngle + deltaX * sensitivity;

    const now = performance.now();
    const dt = now - this.lastTouchTime;
    if (dt > 10) {
      this.velocity = (clientX - this.lastTouchX) / dt;
      this.lastTouchX = clientX;
      this.lastTouchTime = now;
    }
  }

  onDragEnd() {
    this.isDragging = false;
    // Apply inertia based on release velocity
    if (Math.abs(this.velocity) > 0.2) {
      this.targetAngle += this.velocity * 40;
    }
    this.triggerInteractionHaptic();
  }

  triggerInteractionHaptic() {
    if (window.Universe) {
      window.Universe.illuminateStar('Orbit Swiped');
    }
  }

  animate() {
    // Auto rotation when not dragging or paused
    if (this.isRotating && !this.isDragging && !this.isHovered) {
      this.targetAngle -= this.rotationSpeed;
    }

    // Smooth lerp easing
    this.currentAngle += (this.targetAngle - this.currentAngle) * 0.1;

    // Apply transform to the carousel ring
    if (this.carousel) {
      this.carousel.style.transform = `rotateY(${this.currentAngle}deg)`;
    }

    // Highlight card closest to front
    this.updateCardDepths();

    requestAnimationFrame(() => this.animate());
  }

  updateCardDepths() {
    if (!this.cards.length) return;
    const step = 360 / this.cards.length;

    this.cards.forEach((card, index) => {
      const cardAngle = (index * step + this.currentAngle) % 360;
      const normalized = (cardAngle + 360) % 360;

      // When normalized is close to 0 (front-most)
      const distFromFront = Math.min(normalized, 360 - normalized);
      const isFront = distFromFront < 30;

      card.classList.toggle('front-focused', isFront);
      
      // Depth of field: lower opacity for cards far in background
      const depthRatio = 1 - (distFromFront / 180) * 0.55;
      card.style.opacity = Math.max(0.4, depthRatio);
    });
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.OrbitGalleryInstance = new OrbitGallery();
});
