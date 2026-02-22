# Cesar Davila Portfolio

Personal software engineering portfolio built with React and Vite.

## Tech Stack

- React
- Vite
- Custom CSS (no UI framework)

## Project Structure

- `frontend/` main app source
- `frontend/src/sections/` page sections (Hero, About, Skills, Projects, Experience, Education, Contact)
- `frontend/src/components/` reusable UI components
- `frontend/src/data/` portfolio data
- `frontend/public/certificates/` certificate PDFs

## Features

- Sticky navbar with section anchors
- Scroll progress indicator
- Dark/light theme toggle
- Scroll reveal animations
- Projects cards with hover depth/glow effect
- Education + Certifications section with:
  - timeline-style certifications
  - segmented filter (`All`, `Technical`, `Professional`)
  - responsive behavior for desktop and mobile
- Contact form with client-side validation and `mailto:` handoff

## Getting Started

Requirements:

- Node.js 18+ (recommended)
- npm

Install and run:

```bash
cd frontend
npm install
npm run dev
```

Local URL:

- `http://localhost:5173`

## Available Scripts

From `frontend/`:

- `npm run dev` start local dev server
- `npm run build` create production build
- `npm run preview` preview production build locally

## Deployment

This is a static frontend app and can be deployed to platforms like Vercel, Netlify, or GitHub Pages after running:

```bash
cd frontend
npm run build
```
