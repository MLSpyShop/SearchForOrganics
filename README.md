# Search For Organics

A modern React + TypeScript app for discovering organic products, farms, and eco-conscious businesses. The project blends search, AI-assisted recommendations, local discovery, and community/business tooling into a single experience for organic living.

## Overview

Search For Organics is built as a Vite-powered web app with a Node/Express server and Gemini-based AI services. It includes:

- organic product and business discovery
- AI-powered summaries and recommendations
- local search and category-based browsing
- scanner and barcode workflows
- farm, sustainability, and nutrition insights
- community and business tools for organic brands and operators

## Tech stack

- Frontend: React 19, TypeScript, Vite
- Styling: Tailwind CSS
- AI: Google Gemini via `@google/genai`
- Backend: Express server (`server.ts`)
- Data/platform: Firebase + Firestore
- UX: Framer Motion, lucide-react

## Key features

- Organic directory and product search
- AI nutrition scanner and product insights
- Barcode scanner and scan-based workflows
- Community and user profile experiences
- Produce swap, farm map, and route exploration
- Carbon credit, compliance, business audit, and marketing tools
- SEO and developer API utilities

## Repository layout

- `App.tsx` — main application shell and high-level screen orchestration
- `src/components/` — feature modules and UI sections
- `src/services/` — app services and integrations
- `src/lib/` and `src/utils/` — helpers and utility logic
- `src/data/` and `src/content/` — static data and content
- `services/geminiService.ts` — Gemini service integration
- `server.ts` — Express server entry point
- `firebase-applet-config.json` / `firebase-blueprint.json` — Firebase configuration assets
- `firestore.rules` — Firestore security rules
- `.env.example` — environment variable template

## Prerequisites

- Node.js 18+
- npm or Bun
- A Gemini API key

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

Update `.env` with your keys:

```env
VITE_GEMINI_API_KEY=your_client_key
GEMINI_API_KEY=your_server_key
```

3. Run the app in development mode:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Start the production server:

```bash
npm run start
```

## Scripts

```json
{
  "dev": "tsx server.ts",
  "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
  "start": "node dist/server.cjs",
  "lint": "tsc --noEmit"
}
```

## Environment notes

- `VITE_GEMINI_API_KEY` is used in browser/client-side builds.
- `GEMINI_API_KEY` is used by the server-side Node/Express runtime.
- If you deploy to GitHub Pages or a static host, keep the client key limited to public-safe usage.

## Development notes

- The app is organized around feature-rich React sections rather than a single monolithic page.
- Several components are designed for product discovery, compliance, sustainability analytics, and brand tools.
- Firebase and Gemini configuration should be validated before production deployment.

## Contributing

Contributions are welcome. For improvements, please open a pull request with a clear summary of:

- what changed
- why it was needed
- any setup or environment updates required

## Project status

This repository is a functional, feature-rich web application for organic product discovery and community tools. It is actively structured around a React frontend, Express backend, and Gemini-powered intelligence features.
