/**
 * ===================================================================
 * A UNIVERSE MADE FOR FAMI ❤️
 * Memory Timeline & Photo Modal System
 * ===================================================================
 */

class MemoriesSystem {
  constructor() {
    this.timelineContainer = document.getElementById('timeline-list');
    this.modal = document.getElementById('photo-modal');
    this.modalImg = document.getElementById('modal-photo-img');
    this.modalCaption = document.getElementById('modal-photo-caption');
    this.modalDate = document.getElementById('modal-photo-date');
    this.modalClose = document.getElementById('modal-close-btn');

    this.observedItems = new Set();
    this.init();
  }

  init() {
    this.renderTimeline();
    this.setupModal();
    this.setupIntersectionObserver();
  }

  renderTimeline() {
    if (!this.timelineContainer || !FAMI_CONFIG.timeline) return;

    this.timelineContainer.innerHTML = '';
    
    FAMI_CONFIG.timeline.forEach((item, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'timeline-item reveal-on-scroll';
      cardEl.dataset.id = item.id;

      // Stagger delays
      cardEl.classList.add(`delay-${(index % 4) * 100 + 100}`);

      // Generate a refined fallback SVG if image doesn't exist
      const fallbackSvg = this.generateFallbackSVG(item);

      cardEl.innerHTML = `
        <div class="timeline-node">
          <span class="node-sparkle">✦</span>
        </div>
        <div class="timeline-card glass-card">
          <div class="card-media" tabindex="0" role="button" aria-label="View photo: ${item.title}">
            <img 
              src="${item.photo}" 
              alt="${item.title}" 
              loading="lazy"
              class="timeline-photo"
              onerror="this.onerror=null; this.src='${fallbackSvg}';"
            />
            <div class="photo-overlay">
              <span class="view-pill">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                View Photo
              </span>
            </div>
          </div>
          <div class="card-content">
            <div class="chapter-badge">${item.chapter}</div>
            <h3 class="card-title">${item.title}</h3>
            <div class="card-date">${item.date}</div>
            <p class="card-caption">${item.caption}</p>
          </div>
        </div>
      `;

      // Click to open fullscreen photo modal
      const mediaEl = cardEl.querySelector('.card-media');
      mediaEl.addEventListener('click', () => this.openModal(item));
      mediaEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openModal(item);
        }
      });

      this.timelineContainer.appendChild(cardEl);
    });
  }

  generateFallbackSVG(item) {
    // Beautiful placeholder SVG in theme palette
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2a1e3e"/>
            <stop offset="50%" stop-color="#3b2b54"/>
            <stop offset="100%" stop-color="#241b35"/>
          </linearGradient>
          <radialGradient id="starGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#d9b8e4" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#d9b8e4" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="600" height="400" fill="url(#bgGrad)"/>
        <circle cx="300" cy="180" r="140" fill="url(#starGlow)"/>
        <g stroke="#f4cadb" stroke-width="1.5" fill="none" opacity="0.6">
          <circle cx="300" cy="180" r="45"/>
          <path d="M300 120 L300 240 M240 180 L360 180"/>
          <circle cx="300" cy="180" r="4" fill="#fff9fc"/>
        </g>
        <text x="300" y="275" font-family="'Cormorant Garamond', Georgia, serif" font-size="24" fill="#fff9fc" text-anchor="middle" letter-spacing="1.5">
          ${item.title}
        </text>
        <text x="300" y="305" font-family="'Inter', sans-serif" font-size="13" fill="#d9b8e4" text-anchor="middle" letter-spacing="2" opacity="0.8">
          ${item.placeholderText || 'MEMORY PLACEHOLDER'}
        </text>
      </svg>
    `.trim();

    return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
  }

  setupModal() {
    if (!this.modal) return;

    // Close on button click
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Close on Esc key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  openModal(item) {
    if (!this.modal) return;

    this.modalImg.src = item.photo;
    this.modalImg.onerror = () => {
      this.modalImg.src = this.generateFallbackSVG(item);
    };
    this.modalCaption.textContent = item.caption;
    this.modalDate.textContent = `${item.chapter} • ${item.date}`;
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hook into Signature Feature: Illuminate a star
    if (window.Universe) {
      window.Universe.illuminateStar(item.title);
    }
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // First time reaching this memory, illuminate a star
            const id = entry.target.dataset.id;
            if (id && !this.observedItems.has(id)) {
              this.observedItems.add(id);
              if (window.Universe) {
                window.Universe.illuminateStar(`Memory-${id}`);
              }
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    document.querySelectorAll('.timeline-item').forEach((el) => {
      observer.observe(el);
    });
  }
}
