# ⚪ Dot Matrix & Cyber Interactive Portfolio

A minimalist, high-tech personal website built with dot matrix typography, reactive LED glyph light animations, procedural Web Audio, and retro arcade games. Designed specifically to pair with your GitHub profile and showcase your journey in IT, Cybersecurity, and Networking.

---

## ⚡ Core Features

- **Dot Matrix Canvas & Typography**: Dynamic interactive canvas with subtle white dot grid that reacts to cursor proximity, clicks, and ripple waves.
- **Hardware Glyph Interface (01)**:
  - Interactive SVG back with illuminated white LED glyph segments.
  - Interactive modes: `PULSE WAVE`, `BREACH ALARM`, `BATTERY GAUGE`, `TORCH MAX`.
  - Click any individual strip to toggle its LED with synthesized mechanical sounds.
- **Zero-Dependency Web Audio Synthesizer**:
  - Procedurally generated 8-bit chimes, glyph ignition hums, switch clicks, and alarms using pure JavaScript `AudioContext` (no external MP3/WAV files required).
- **Interactive Cyber Arcade (Dual Mode)**:
  - **Cyber Packet Runner (Snake)**: Playable on a retro 24x16 LED dot matrix display. Eat encrypted data packets (`#D71921`), build high scores, with full keyboard (WASD / Arrows) and touch D-pad support.
  - **Glyph Composer**: 4 tactile pads playing electronic chords while flashing matched glyph lights.
- **Under The Hood // Cyber Terminal**:
  - Functional interactive shell (`operator@system:~$`).
  - Commands: `help`, `whoami`, `about`, `certs`, `goals`, `mindset`, `quote`, `scan` (simulated port scan), `matrix` (glyph wave), `clear`.
- **Ultra-Clean Modern Architecture & Liquid Glass**:
  - **Slim Floating Liquid Glass Navbar**: Slim, airy pill bar with generous 36px word spacing, live clock, audio/theme controls.
  - **Circular White LED Dot Matrix (RYOEH)**: Authentic circular LED dot matrix headline with interactive light ripple waves on hover and click.
  - **Un-Boxed Flowing Layout**: Generous 100px breathing room between sections, soft borderless flow with specular liquid glass panels.
  - **About Me**: Liquid glass cards with casual explanation and live `[INSPECT]` packet monitor.
  - **Verified Certifications**: Cambridge English B1, ICDL Essentials, Introduction to Cybersecurity.
  - **Interactive Lab**: Un-cramped dedicated showcase with Hardware Glyphs, Retro Dot-Matrix Arcade, and Full-Width Debug Terminal.
  - **Tactile Mindset Switches & Goals**: Real-time flip switches and foundation integrity meter.
  - **Zenitsu & Kuwajima Quote**: Custom art background featuring Zenitsu Agatsuma with thunder breathing badge and Jigoro Kuwajima's philosophy:
    > *"If you can only do one thing, hone it to perfection."*
- **Minimal Status Bar**:
  - Real-time digital dot clock (`HH:MM:SS`).
  - Battery API integration (`98% [⚡]`).
  - Audio mute/unmute toggle.
  - Light / Dark theme switcher.
  - Full-screen Torch mode.

---

## 🚀 How to Run Locally

### Option 1: Double Click
Simply double-click `index.html` in your file explorer to open it directly in Google Chrome, Brave, Edge, or Firefox!

### Option 2: Local HTTP Server (Python)
If you have Python installed:
```powershell
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option 3: Node / NPX
```powershell
npx serve .
```

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

1. Create a new GitHub repository (e.g. `cyber-portfolio` or `<your-username>.github.io`).
2. Push the files in this directory to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Cyber Dot Matrix Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/cyber-portfolio.git
   git push -u origin main
   ```
3. Go to **Repository Settings** > **Pages** > **Build and deployment**.
4. Set **Source** to `Deploy from a branch`, choose `main` branch and `/ (root)`.
5. Click **Save**. Your site will be live at `https://<your-username>.github.io/cyber-portfolio`!

---

## 🔗 How to Link in Your GitHub README.md

Add this badge to the top of your GitHub `README.md`:

```markdown
[![Cyber Portfolio](https://img.shields.io/badge/CYBER-PORTFOLIO-050505?style=for-the-badge&logoColor=white&labelColor=D71921)](https://<your-username>.github.io/cyber-portfolio)
```
