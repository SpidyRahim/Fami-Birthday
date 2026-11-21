# A Universe Made for Fami ❤️
> *One person. A thousand memories. An entire universe of love.*
> 
> **Dedicated to:** Fami  
> **Special Date:** November 23, 2026  
> **Website Password:** `14Aug2019`

---

## 🌌 Overview

"A Universe Made for Fami" is an intimate, cinematic birthday experience engineered with pure Vanilla HTML5, CSS3, and JavaScript. Crafted with romantic celestial aesthetics, it features an interactive starfield engine, an unlockable secret entrance, a vertical memory timeline, 23 personal flip cards, an interactive birthday cake with candle-blowing interaction, a voice message player, hidden treasures, and an emotional cosmic climax.

---

## 🎨 Design System & Palette

- **Lavender:** `#D9B8E4`
- **Blush Pink:** `#F4CADB`
- **Champagne:** `#F6E9D2`
- **Midnight Purple:** `#241B35`
- **Soft White:** `#FFF9FC`
- **Rose Gold:** `#D9A6B5`

**Typography:**
- **Headings:** *Cormorant Garamond*
- **Body & Controls:** *Inter*
- **Personal Letters & Poetry:** *Caveat* (Handwritten)

---

## 📁 File Structure

```text
fami-universe/
│
├── index.html                 # Main continuous experience entry point
│
├── css/
│   ├── style.css              # Core design tokens, glassmorphism, & layout
│   ├── animations.css         # Keyframe transitions, stardust glow, & candle flames
│   └── responsive.css         # Mobile-first viewport rules (320px - 430px, tablet, desktop)
│
├── js/
│   ├── data.js                # Centralized editable content, dates, letters & secrets
│   ├── universe.js            # Canvas starfield & "The Little Universe Remembers" engine
│   ├── memories.js            # Memory timeline & fullscreen photo viewer modal
│   ├── interactions.js        # Password gate, envelope, cake blowing, audio & secrets
│   └── main.js                # App bootstrap & orchestration
│
├── assets/
│   ├── images/
│   │   ├── gallery/           # 3D Orbit Gallery (Upload 1.jpg, 2.jpg, 3.jpg ... auto-detected!)
│   │   ├── memories/          # Photos for the 5 timeline chapters (with SVG fallbacks)
│   │   ├── flowers/           # Floral accents
│   │   └── backgrounds/       # Celestial backdrop assets
│   │
│   └── audio/
│       ├── birthday-voice.mp3 # Your recorded personal voice message
│       └── ambient-music.mp3  # Background instrumental audio (with synth fallback)
│
└── README.md                  # Complete documentation & deployment guide
```

---

## 🛠️ Customization Guide

All personal memories, texts, and settings are cleanly separated into `js/data.js`. You do not need to modify any code in HTML or CSS to customize your messages.

### 1. Adding Your Real Photos
1. Place your photo files into `assets/images/memories/`.
2. Recommended formats: `.jpg`, `.png`, or `.webp`. (Recommended resolution: 1200x800 or 4:3 / 16:9 ratio).
3. Name them:
   - `memory-1.jpg` (Chapter 01: The Beginning)
   - `memory-2.jpg` (Chapter 02: Little Things)
   - `memory-3.jpg` (Chapter 03: Beautiful Memories)
   - `memory-4.jpg` (Chapter 04: The Unforgettable Moments)
   - `memory-5.jpg` (Chapter 05: Our Journey Continues)
4. Open `js/data.js` and update the `photo` paths in `FAMI_CONFIG.timeline`:
   ```javascript
   photo: "assets/images/memories/memory-1.jpg",
   ```
   *Note: If a photo is ever missing or fails to load, the site gracefully falls back to the built-in artistic SVG placeholders without breaking.*

---

### 1.5. Adding Photos to the 3D Celestial Orbit Gallery
1. Open the folder `assets/images/gallery/`.
2. Simply name your photos sequentially:
   - `1.jpg`
   - `2.jpg`
   - `3.jpg`
   - `4.jpg`
   - ... `X.jpg` (as many as you want!)
3. The website's smart auto-detector will automatically discover how many photos are in the folder and evenly space them in the rotating 3D galaxy ring.
4. **No code editing required!** Anytime you want to add more photos later, simply drop `6.jpg`, `7.jpg`, etc., into `assets/images/gallery/` and refresh the page.

---
1. Record your heartfelt voice message (using your phone voice recorder or mic).
2. Save or export it as an MP3 file.
3. Place it in `assets/audio/birthday-voice.mp3`.
4. The custom player will automatically read the duration, enable scrubbing, and pulse the waveform while your voice plays.
5. *Note: If no audio file is present, clicking play runs a demonstration preview mode so the website never crashes.*

---

### 3. Adding Ambient Background Music (Optional)
1. Choose a soft, romantic instrumental melody.
2. Save it as `assets/audio/ambient-music.mp3`.
3. If this file is omitted, the website automatically uses the Web Audio API to synthesize an ethereal Db Major 7 celestial drone when the visitor taps **"Music: Off"**.

---

### 4. Editing Personal Messages & Letters
Open `js/data.js` in any text editor:
- **Change Password:** Modify `FAMI_CONFIG.password.correctHash` (default is `14Aug2019`).
- **Timeline Captions & Dates:** Modify `FAMI_CONFIG.timeline`.
- **23 Special Reasons:** Modify `FAMI_CONFIG.reasons` (Card #23 is configured to reveal `"Simply because you're YOU."`).
- **Voice Section Letter:** Modify `FAMI_CONFIG.voiceSection.letterText`.
- **Future Chapters:** Modify `FAMI_CONFIG.futureChapters`.
- **Hidden Secrets:** Modify `FAMI_CONFIG.hiddenTreasures`.
- **Final Surprise Letter:** Modify `FAMI_CONFIG.finalSurprise.letter`.

---

## 🔒 Client-Side Password Gate: Limitations

### How it works:
The password gate intercepts user interaction, requiring `14Aug2019` before revealing the secret envelope and universe scroll.

### Security Reality:
- Because this is a client-side static web application (HTML/CSS/Vanilla JS) without a backend authentication server, the password is stored within `js/data.js`.
- Anyone with developer tools can inspect the JavaScript source code or network tab to locate the password string.
- This password gate serves as a **romantic, emotional threshold and privacy curtain** for Fami's experience—not as high-security cryptographic protection. It prevents accidental viewing and gives Fami the magical feeling of unlocking her private universe.

---

## 🚀 How to Deploy on Cloudflare Pages (Free & Instant)

Cloudflare Pages is the fastest, most reliable way to host this static website with free SSL/HTTPS, fast global CDN, and no server maintenance.

### Method A: Direct Upload (Drag-and-Drop — 2 Minutes)
1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and sign in or create a free account.
2. In the left navigation, click **Workers & Pages**.
3. Click **Create Application**, then select the **Pages** tab.
4. Click **Upload assets**.
5. Give your project a name (e.g., `fami-universe`).
6. Drag and drop the entire project folder (containing `index.html`, `css/`, `js/`, `assets/`) into the upload dropzone.
7. Click **Deploy site**.
8. Within 15 seconds, you will receive a live URL:  
   `https://fami-universe.pages.dev`
9. (Optional) You can link your own custom domain name (e.g. `fami.yourdomain.com`) in the custom domains tab.

---

### Method B: Git Integration (GitHub / GitLab)
1. Initialize git in this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial release: A Universe Made for Fami"
   ```
2. Push to your private GitHub repository:
   ```bash
   git remote add origin https://github.com/<your-username>/fami-universe.git
   git branch -M main
   git push -u origin main
   ```
3. In Cloudflare Pages, select **Connect to Git** and choose the `fami-universe` repository.
4. Set **Build command** to blank (none needed for static sites).
5. Set **Build output directory** to `/` (root).
6. Click **Save and Deploy**. Any future updates you push to GitHub will automatically deploy!

---

## 📱 Mobile Responsiveness Checklist

Tested and optimized for:
- [x] **320px** (Galaxy Fold & compact viewports)
- [x] **360px** (Standard Android portrait)
- [x] **375px** (iPhone SE, iPhone mini)
- [x] **390px** (iPhone 12/13/14/15 standard)
- [x] **430px** (iPhone 14/15 Pro Max)
- [x] **Tablets & Desktop** (fluid responsive grid)
- [x] **Touch Targets:** All interactive triggers, buttons, and candles maintain a minimum of 44px x 44px touch area.
- [x] **No Horizontal Overflow:** Strict max-width and `overflow-x: hidden` enforcement.
- [x] **Safe Area Insets:** Optimized for notches, dynamic islands, and home indicator bars (`env(safe-area-inset-top)` / `bottom`).

---

Made with boundless love for **Fami** ❤️
