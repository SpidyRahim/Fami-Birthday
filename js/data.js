/**
 * ===================================================================
 * A UNIVERSE MADE FOR FAMI ❤️
 * Data & Configuration File
 * ===================================================================
 * Keep all content, memories, messages, and configuration here.
 * You can easily customize texts, dates, and placeholders without touching the code.
 */

const FAMI_CONFIG = {
  // Website metadata
  title: "A Universe Made for Fami",
  tagline: "One person. A thousand memories. An entire universe of love.",
  recipientName: "Fami",
  senderName: "Rahim",
  birthdayDate: "November 23, 2026",
  
  // Section 01: Password Configuration
  // Client-side static password configuration
  password: {
    correctHash: "14Aug2019", // The secret code
    hint: "A special date that started it all... (DDMmmYYYY)",
    maxAttempts: 5,
    errorMessage: "That key doesn't turn this lock... Try again, my love."
  },

  // Audio paths
  audio: {
    ambientMusic: "assets/audio/ambient-music.mp3",
    voiceMessage: "assets/audio/birthday-voice.mp3"
  },

  // Section 02: Secret Entrance
  secretEntrance: {
    envelopeSubtitle: "For Fami's Eyes Only",
    message: "Somewhere in this endless universe, there is a little world that belongs only to you.",
    buttonText: "Open Your Little Universe"
  },

  // Section 03: Welcome
  welcome: {
    heading: "Welcome to Your Own Little Universe, Fami.",
    supportingMessage: "Today, the stars are a little brighter because this day belongs to you.",
    buttonText: "Let's Begin",
    subNote: "Scroll down or click to wander through your universe"
  },

  // Section 04: Our Story, Our Little World (5 Chapters)
  // Edit these neutral placeholders with your actual memories, dates, and photos
  timeline: [
    {
      id: 1,
      chapter: "Chapter 01",
      title: "The Beginning",
      date: "August 14, 2019",
      caption: "Where two separate paths crossed under the quiet sky. The day you stepped into my world and made everything softer, brighter, and infinitely more meaningful.",
      photo: "assets/images/memories/memory-1.svg",
      placeholderText: "The First Chapter"
    },
    {
      id: 2,
      chapter: "Chapter 02",
      title: "Little Things",
      date: "Cherished Moments",
      caption: "Your quiet laughter, the way your eyes crinkle when you're truly happy, late night conversations, and the comfort of just knowing you are there.",
      photo: "assets/images/memories/memory-2.svg",
      placeholderText: "Little Everyday Magic"
    },
    {
      id: 3,
      chapter: "Chapter 03",
      title: "Beautiful Memories",
      date: "Unspoken Warmth",
      caption: "Every place we visited, every quiet smile shared across a crowded room, every song that suddenly started sounding like you.",
      photo: "assets/images/memories/memory-3.svg",
      placeholderText: "Golden Memories"
    },
    {
      id: 4,
      chapter: "Chapter 04",
      title: "The Unforgettable Moments",
      date: "Timeless Days",
      caption: "The days that stood still. The milestones where time seemed to pause just so we could take a breath and realize how lucky we are.",
      photo: "assets/images/memories/memory-4.svg",
      placeholderText: "Unforgettable Milestones"
    },
    {
      id: 5,
      chapter: "Chapter 05",
      title: "Our Journey Continues",
      date: "Every Tomorrow",
      caption: "This is not just where we've been; it's the beautiful promise of everywhere we have yet to go, hand in hand under the same constellation.",
      photo: "assets/images/memories/memory-5.svg",
      placeholderText: "The Endless Road Ahead"
    }
  ],

  // Section 05: 23 Reasons Why You're Special
  // Exactly 23 cards. The 23rd card has the special fixed revelation.
  reasons: [
    { id: 1, text: "Your smile has the power to melt away my heaviest days." },
    { id: 2, text: "The kindness and gentleness in how you treat the world around you." },
    { id: 3, text: "Your infectious laugh that brings light into every room." },
    { id: 4, text: "The depth of your heart and how deeply you care for people." },
    { id: 5, text: "The way you notice the little things that most people overlook." },
    { id: 6, text: "Your quiet strength and resilience when things get difficult." },
    { id: 7, text: "The warmth and peace I feel whenever I talk to you." },
    { id: 8, text: "Your beautiful mind and your unique perspective on life." },
    { id: 9, text: "How you make ordinary moments feel like poetry." },
    { id: 10, text: "Your patience, understanding, and generous soul." },
    { id: 11, text: "The way your eyes sparkle when you talk about things you love." },
    { id: 12, text: "You inspire me to become a better, more loving human being." },
    { id: 13, text: "Your comforting presence that feels just like coming home." },
    { id: 14, text: "The playful, sweet side of you that never fails to cheer me up." },
    { id: 15, text: "How genuine and true you are to who you are." },
    { id: 16, text: "The sweet memories we've woven together across the years." },
    { id: 17, text: "Your wisdom, insight, and gentle advice." },
    { id: 18, text: "How effortlessly you bring beauty into my everyday life." },
    { id: 19, text: "The safe sanctuary I find in your words and your embrace." },
    { id: 20, text: "Your sense of wonder and the grace you carry yourself with." },
    { id: 21, text: "The unspoken bond and understanding we share without needing words." },
    { id: 22, text: "Because loving you is the easiest, most natural thing I have ever done." },
    { id: 23, text: "Simply because you're YOU." } // Rule: Last card must reveal this
  ],

  // Section 06: Birthday Cake
  cake: {
    instruction: "Make a wish and tap each candle to blow it out...",
    micInstruction: "Or tap 'Enable Mic' to blow them out with your breath!",
    wishedMessage: "May all the beautiful things you wish for find their way to you.",
    candlesCount: 3
  },

  // Section 07: Voice Message
  voiceSection: {
    heading: "A Voice From My Heart",
    subheading: "Press play to hear the words that my heart wanted to tell you today.",
    letterText: `My Dearest Fami,

If I could pluck every star from the night sky and arrange them into your name, it would still not be enough to show how much light you have brought into my life.

On your special birthday, my only wish is for your days to be filled with gentle peace, boundless joy, and the quiet certainty of knowing that you are deeply, unconditionally cherished.

Happy Birthday, my favorite soul in this vast universe.

Forever yours,
Rahim`
  },

  // Section 08: Our Unwritten Chapters
  futureChapters: [
    {
      icon: "compass",
      title: "Places to Explore",
      description: "Sunset coastlines, hidden bookshops, quiet mountain mornings, and roads we haven't dreamed of walking yet."
    },
    {
      icon: "target",
      title: "Dreams to Achieve",
      description: "Cheering for every single one of your goals, watching you shine, and celebrating every triumph together."
    },
    {
      icon: "coffee",
      title: "Little Adventures",
      description: "Spontaneous late-night drives, baking together, rainy afternoons with warm tea, and quiet shared laughter."
    },
    {
      icon: "sparkles",
      title: "Beautiful Moments Yet to Come",
      description: "A thousand quiet dawns, a million shared smiles, and all the unwritten wonders waiting in our tomorrow."
    }
  ],

  // Section 09: Hidden Treasures (5 symbols)
  hiddenTreasures: [
    {
      id: "star",
      symbol: "★",
      name: "Guiding Star",
      secret: "No matter how dark the night gets, you are always the star that guides me home."
    },
    {
      id: "heart",
      symbol: "♥",
      name: "Gentle Heart",
      secret: "Every heartbeat of mine carries a quiet whisper of gratitude for your existence."
    },
    {
      id: "butterfly",
      symbol: "🦋",
      name: "Fluttering Butterfly",
      secret: "You brought delicate transformation, grace, and color to my black-and-white world."
    },
    {
      id: "flower",
      symbol: "🌸",
      name: "Eternal Bloom",
      secret: "Like a blossom in spring, you make everything around you grow softer and more lovely."
    },
    {
      id: "moon",
      symbol: "🌙",
      name: "Luminous Moon",
      secret: "Even in your quietest, most subtle moments, your glow brightens my entire horizon."
    }
  ],

  // Section 10: Final Surprise Letter
  finalSurprise: {
    bigHeading: "HAPPY BIRTHDAY, FAMI! ❤️",
    letter: `Fami,

Today, the entire universe pauses to celebrate the day you arrived into the world.

Thank you for being my sanctuary, my joy, my soft place to fall, and my brightest inspiration. You make life feel like a cinematic dream, rich with meaning and overflowing with warmth.

May this new year of your life bring you the deepest happiness, radiant health, dreams fulfilled, and love that surrounds you in every direction.

Never forget how extraordinary, how cherished, and how deeply loved you are.

Happy Birthday, with all of my universe.
Forever & always,
Rahim ❤️`,
    replayButtonText: "Replay Our Little Universe"
  }
};

// Freeze config to prevent accidental runtime mutations
Object.freeze(FAMI_CONFIG);
