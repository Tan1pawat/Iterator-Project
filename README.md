# The Iterator Project

A personal learning platform representing the cycle of "Try -> Fail -> Learn -> Repeat." 

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + Custom CSS Modules
- **Animation:** GSAP
- **Icons:** Lucide React
- **Syntax Highlighting:** Prism React Renderer

## Features
- **X-Ray Mode:** A global toggle that reveals the underlying code of the components.
- **Modern Clean Doodle Aesthetic:** Minimalist design with hand-drawn accents.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
  - `CodeReveal.tsx`: Wrapper for X-Ray mode.
  - `Hero.tsx`: The main hero section.
  - `XRayToggle.tsx`: The floating toggle button.
- `context/`: React Context providers.
  - `XRayContext.tsx`: Manages the X-Ray mode state.
