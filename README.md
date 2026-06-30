# WebDNA

**Analyze. Improve. Grow.**

WebDNA is an AI-powered website intelligence platform built for engineering, product, growth, SEO, and design teams. It helps teams understand website quality, spot issues faster, and prioritize the work that matters most.

This repository contains a premium Next.js frontend and a production-ready Express + Prisma backend. The experience is intentionally designed to feel like modern enterprise SaaS, not a generic admin dashboard.

## What WebDNA Does

- Analyzes websites from a single URL.
- Turns raw site data into structured reports and score breakdowns.
- Highlights strengths, weaknesses, and priority improvements.
- Shows dashboard metrics, trends, and recent activity.
- Provides a history view for old analyses and saved reports.
- Gives users profile and settings management in a polished workspace.
- Prepares the app for future Gemini-powered analysis.

## Why Teams Use It

WebDNA is useful when a team needs more than a one-time audit. It gives product, design, engineering, and growth teams a shared view of:

- performance regressions
- SEO quality
- accessibility gaps
- UX friction
- security signals
- conversion opportunities

Instead of scattered tools and disconnected spreadsheets, WebDNA centralizes website intelligence into one workflow.

## Architecture

```mermaid
flowchart TB
  U[User] --> F[Next.js 15 Frontend]
  F -->|Axios + JWT| B[Express API]
  B -->|Prisma Client| P[(PostgreSQL)]
  B --> C[Website Analysis Services]
  C --> G[Gemini / AI Layer]

  F --> D[Dashboard]
  F --> R[Reports]
  F --> H[History]
  F --> PR[Profile]
  F --> S[Settings]

  subgraph Frontend
    D
    R
    H
    PR
    S
  end

  subgraph Backend
    B
    C
    G
  end
```

## Frontend Experience

The frontend focuses on a premium SaaS feel with:

- a polished public marketing site
- authenticated dashboard screens
- collapsible sidebar navigation
- command search and profile controls
- theme switching
- chart-heavy analytics views
- loading skeletons and empty states
- motion, hover effects, and smooth transitions
- responsive layouts for mobile through ultra-wide screens

## Backend Foundation

The backend is structured to support the frontend without relying on mock data. It includes:

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication support
- bcrypt password hashing
- Zod validation
- Axios and Cheerio for website analysis
- Helmet, Morgan, and CORS

The Prisma schema models the core product entities:

- users
- websites
- analyses
- reports

## Core Screens

- Marketing landing page
- Login
- Signup
- Dashboard
- Analyze Website
- Report Details
- History
- Profile
- Settings
- 404 page

## How Data Flows

1. A user signs in through the frontend.
2. The frontend stores the JWT in localStorage.
3. Axios sends that token with API requests.
4. The backend validates the token and returns dashboard, report, history, and profile data.
5. Prisma reads and writes data from PostgreSQL.
6. The UI renders premium analytics views with loading and error states.

## Design Principles

- Premium SaaS feel
- Clear hierarchy and strong typography
- Consistent spacing and card patterns
- Smooth motion, hover states, and transitions
- Accessible controls and visible focus states
- Reusable components and a scalable folder structure

## Deployment Notes

- Frontend: Vercel is a natural fit.
- Backend: Railway or Render are strong choices.
- Database: use a managed PostgreSQL service.
- Secrets: keep them in platform environment variables, not in the client bundle.

## Setup

The essentials:

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Backend Environment Variables

```env
PORT=4000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/webdna_backend?schema=public"
JWT_SECRET=replace-me
JWT_EXPIRES_IN=7d
```

If you add Gemini later, keep the key on the backend only:

```env
GEMINI_API_KEY=your_key_here
```

## Scripts

### Frontend

- `npm run dev` - start the Next.js dev server
- `npm run build` - build the frontend for production
- `npm run start` - start the production frontend server
- `npm run lint` - run ESLint
- `npm run typecheck` - run the TypeScript compiler check

### Backend

From the `backend/` folder:

- `npm run dev` - start the API in watch mode
- `npm run build` - compile TypeScript to `dist/`
- `npm run start` - start the compiled backend
- `npm run prisma:generate` - generate Prisma Client
- `npm run prisma:migrate` - run Prisma migrations
- `npm run prisma:studio` - open Prisma Studio

## Project Status

This project already includes:

- a polished marketing site
- authenticated dashboard screens
- backend foundation and API structure
- Prisma schema for persistent data
- live API integration for the frontend

The codebase is set up to support future Gemini-powered analysis without changing the overall architecture.

