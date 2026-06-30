# WebDNA

**Analyze. Improve. Grow.**

WebDNA is an AI-powered website intelligence platform for engineering, product, growth, SEO, and design teams. It combines a premium Next.js frontend with an Express + Prisma backend to help teams analyze websites, review reports, monitor history, and act on prioritized recommendations.

## What This Repository Contains

This repository is organized as a two-part product stack:

- `src/` contains the Next.js 15 frontend application.
- `backend/` contains the Node.js + Express + TypeScript + Prisma API.

The frontend is designed as an enterprise-grade SaaS experience with dashboard workflows, report details, history browsing, profile/settings screens, and a polished public marketing site.

The backend exposes the data needed for those experiences and is ready for future expansion, including AI analysis generation.

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

## Frontend Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide React
- React Hook Form
- Zod
- Axios
- Recharts
- Zustand
- `next-themes`

## Backend Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Zod
- Axios
- Cheerio
- Helmet
- Morgan
- CORS

## Key Product Areas

- Marketing site for the public landing experience
- Authentication flow for sign in and sign up
- Enterprise dashboard with charts, KPI cards, activity, and notifications
- Website analysis workspace
- Report details view
- History table with filters and actions
- Profile and settings screens
- Backend API for auth, analysis, reports, dashboard, and history

## Local Development

### 1. Frontend

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`.

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:4000` by default.

## Environment Variables

### Backend

Create `backend/.env` from `backend/.env.example`:

```env
PORT=4000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/webdna_backend?schema=public"
JWT_SECRET=replace-me
JWT_EXPIRES_IN=7d
```

### Optional Gemini Integration

If you add Gemini AI later, keep the key on the backend only:

```env
GEMINI_API_KEY=your_key_here
```

## Available Scripts

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

## Data Flow

1. The user signs in through the frontend.
2. The frontend stores the JWT in localStorage.
3. Axios attaches the token to backend requests automatically.
4. The backend validates the token and returns dashboard, report, history, and profile data.
5. Prisma reads and writes data from PostgreSQL.
6. The UI renders premium analytics experiences with loading and error states.

## Design Principles

- Premium SaaS feel
- Clear information hierarchy
- Strong spacing and typography system
- Smooth motion and hover interactions
- Responsive layouts for mobile through ultra-wide screens
- Accessible controls and visible focus states
- Reusable components and a scalable folder structure

## Deployment Notes

- Frontend can be deployed to Vercel.
- Backend is best deployed to Railway or Render.
- Use a managed PostgreSQL instance for the backend database.
- Keep secrets in platform environment variables, not in the client bundle.

## Project Status

This project already includes:

- a polished marketing site
- authenticated dashboard screens
- backend foundation and API structure
- Prisma schema for persistent data
- live API integration for the frontend

The codebase is set up to support future Gemini-powered analysis without changing the overall architecture.

