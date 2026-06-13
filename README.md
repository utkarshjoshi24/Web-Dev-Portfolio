# 🌌 Utkarsh Joshi | Immersive 3D Space Cockpit Portfolio

A cinematic, interactive 3D web portfolio that places you in the pilot's seat of a spacecraft traversing the solar system. Built using **React Three Fiber**, **Three.js**, **GSAP**, and **Lenis** smooth scroll, this website guides visitors through a visual cosmic journey, revealing professional milestones, skills, and projects at each planetary destination.

---

## 🚀 The Experience Concept

This website is styled with an **Obsidian Flux** aesthetic—combining dark mode surfaces with glassmorphism overlays and vibrant cyan, violet, and deep blue accent light fields. 

As you scroll, the spacecraft's camera flies along a pre-calculated path in 3D space, transitioning through different coordinates:
1. **🌎 Earth** — *Hero Section*: Welcome & introduction to the pilot.
2. **🔴 Mars** — *About Section*: Background, philosophy, and personal story.
3. **🟠 Jupiter** — *Skills Section*: Interactive dashboard displaying frontend, backend, and 3D proficiencies.
4. **🪐 Saturn** — *Experience Section*: Scrolling timeline of professional roles and contributions.
5. **🔵 Uranus** — *Projects Section*: Interactive floating panels showing featured applications.
6. **🌀 Neptune** — *Services Section*: Core services and technical capabilities.
7. **🌕 Moon** — *Contact Section*: Mission landing and contact options.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: React 19 (via Vite)
- **3D Graphics Engine**: Three.js & [React Three Fiber (R3F)](https://r3f.docs.pmnd.rs/)
- **3D Helper Library**: `@react-three/drei`
- **Post-Processing**: `@react-three/postprocessing` (GLSL shaders, vignette, chromatic aberration, bloom)
- **Animation Engine**: GSAP (GreenSock)
- **Smooth Scroll**: Lenis Scroll (frictionless, momentum-based scrolling physics)
- **Styling**: Modern CSS (featuring custom HUD elements, glassmorphism, responsive grid systems, and custom fonts)

---

## 📂 Project Structure

```
├── public/                  # Static assets and space models/textures
└── src/
    ├── assets/              # Component-specific visual assets
    ├── components/          # React & 3D components
    │   ├── Scene.jsx        # Core 3D scene holding the universe, planets, and lights
    │   ├── CameraRig.jsx    # Handles camera positioning and pathing based on scroll
    │   ├── CockpitHUD.jsx   # Futuristic cockpit overlays (compass, artificial horizon)
    │   ├── Starfield.jsx    # Custom procedural star particles
    │   ├── ParticleField.js # Flying dust and stellar wind effects
    │   ├── Asteroids.jsx    # Randomly generated asteroid belt orbiting planets
    │   └── ...              # HTML Overlay sections (Hero, About, Skills, etc.)
    ├── hooks/
    │   ├── useMousePosition.js   # Captures normalized mouse coords for parallax/HUD steer
    │   └── useScrollProgress.js  # Tracks page-scroll completion percentage
    ├── utils/
    │   └── constants.js     # Color palettes, skills list, and camera coordinate keyframes
    ├── App.jsx              # Main App entry orchestrating the Canvas and HTML overlays
    └── index.css            # Global CSS, loading screens, and layout styling
```

---

## ⚙️ Development & Run

Follow these instructions to run the portfolio locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/utkarshjoshi24/Web-Dev-Portfolio.git
   cd Web-Dev-Portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the development server:
   ```bash
   npm run dev
   ```
This will start the Vite dev server, typically running at `http://localhost:5173`. Open this URL in your browser to experience the cockpit.

### Building for Production
To generate optimized production static files:
   ```bash
   npm run build
   ```
The outputs will be generated inside the `/dist` directory, ready to be deployed to platforms like Vercel, Netlify, or GitHub Pages.

---

## 🛰️ Interface Features & Mechanics

- **Interactive HUD Compass**: Reacts to mouse movement, mimicking the rotation of a physical instrument panel inside the cockpit.
- **Flight Path Interpolation**: Uses GSAP to smoothly interpolate the camera's `position`, `lookAt` vector, and `fov` along keyframes specified in `constants.js`.
- **Cosmic Particles & Volumetrics**: Includes a moving starfield, floating asteroid clusters, and volumetric directional light beams to create deep spatial volume.
- **Performance Optimized**: Uses standard InstancedMesh for asteroid belts and particles to keep rendering overhead minimal, targeting 60fps on modern devices.
