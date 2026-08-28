# 🪢 Rakhi Purnima — The Thread That Binds Us ❤️

An interactive animated Rakhi Purnima experience designed as a digital storybook celebrating sibling memories, love, chaos, distance, gifts, promises, and the sacred Rakhi bond.

## ✨ Live Experience

**Live Demo**: [Will be updated after deployment]

## 🎬 About the Project

This is not just a standard website; it is an animated journey. It captures the emotional essence of Rakhi Purnima—from the silly childhood fights over remote controls and chocolates to the deeper promises that bind siblings together even when they are separated by distance.

## 🌸 Features

*   **Animated Bengali-first storytelling** (with full English language support)
*   **Animated sibling characters**
*   **Interactive childhood memories** (find the hidden chocolate!)
*   **Playful sibling fight** (tug-of-war for the phone charger)
*   **Interactive time machine** (dragging the thread through the ages)
*   **Animated Rakhi tying ceremony** (with cinematic camera zoom)
*   **Gift opening animation**
*   **Custom Rakhi experience** (build your own digital Rakhi)
*   **Distance/parallax journey** (navigating life in different cities)
*   **Automatic Bengali letter** (handwritten style)
*   **Promise garden** (floating promises in a magical garden)
*   **Interactive night sky** (constellation revealing a golden Rakhi)
*   **Hidden secret memories**
*   **Animated finale** (sunrise and celebration)
*   **Continuous background soundtrack**
*   **Responsive mobile experience** (touch-friendly interactions)
*   **Smooth Framer Motion animations**

## 🧭 The 12 Chapters

1.  **Rakhi Morning**: The first thread appears.
2.  **Childhood Memories**: Nostalgic objects with hidden interactions.
3.  **The Fight**: A hilarious tug-of-war for the charger!
4.  **Time Machine**: Morphing memories from childhood to adulthood.
5.  **The Rakhi Moment**: The beautiful tying ceremony.
6.  **The Gift**: A magical, glowing surprise.
7.  **Build Your Rakhi**: Craft your own digital Rakhi.
8.  **Distance**: A parallax journey showing separate lives.
9.  **The Unsent Message**: A heartfelt, handwritten letter.
10. **Promises**: A magical garden of floating memories and vows.
11. **Night Sky & Secrets**: Discover the Rakhi constellation.
12. **Finale**: The sunrise and ultimate celebration.

## 🛠️ Tech Stack

*   **React** & **TypeScript**
*   **Vite**
*   **Tailwind CSS**
*   **Framer Motion**
*   **Lucide React**
*   **html2canvas**
*   **CSS/SVG Animation**
*   **LocalStorage**

## 🚀 Run Locally

```bash
git clone https://github.com/swarupOSD/rakhi-purnima.git
cd rakhi-purnima
npm install
npm run dev
```

The development server will provide the local URL (usually `http://localhost:5174` or `http://localhost:5173`).

## 🏗️ Production Build

```bash
npm run build
npm run preview
```

*   `npm run build`: Compiles the TypeScript and bundles the application for production into the `dist/` directory.
*   `npm run preview`: Starts a local web server that serves the production build for testing.

## 📁 Project Structure

```text
src/
├── components/
│   ├── characters/   # Sibling SVG animations
│   ├── sections/     # The 12 narrative chapters
│   └── ui/           # Global UI (HUD, particles, floating nav)
├── context/          # Audio, Language, and Secret state management
├── App.tsx           # Main application routing and assembly
└── index.css         # Tailwind directives and custom animation utilities

public/
└── background_music.mp3  # The continuous Rakhi soundtrack
```

## 🎵 Music

This experience includes a bundled Rakhi soundtrack to enhance the emotional journey. Modern browser autoplay restrictions may require the user's first natural interaction (like a tap or scroll) before audible playback begins silently in the background.

## 📱 Responsive Design

The experience is fully responsive across desktop, tablet, and mobile devices, with special attention given to touch-friendly interactions (like dragging the thread or tug-of-war) on mobile screens.

## ⚡ Performance

The project is heavily optimized using transform/opacity-based CSS animations, lightweight SVG artwork, and Framer Motion's hardware-accelerated animations to maintain buttery smooth 60fps performance without relying on heavy WebGL.

## 🔐 Privacy

The letter and promise experiences use browser `localStorage` to save custom messages. No personal information is sent to an external backend server.

## 🌐 Deployment

Deployed seamlessly using Vercel.

## ❤️ Credits

Created by **SwarupOSD**

Built with ❤️ for Rakhi Purnima.

## 📄 License

MIT License.
