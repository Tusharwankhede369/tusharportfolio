# Tushar Prabhakar Wankhede — Portfolio Platform

Production-oriented portfolio with a cinematic public site and a secure admin console for managing content (projects, skills, experience, certifications, SEO, uploads).

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, GSAP (ScrollTrigger), AOS, Lottie (`lottie-react`), Radix UI primitives, Lucide icons, TanStack Query, Recharts, Sonner.
- **Backend:** Node.js (ESM), Express, Mongoose, JWT (access + refresh with rotation), bcrypt, Multer + Sharp (image → WebP), Helmet, CORS, rate limiting, `express-mongo-sanitize`.

## Prerequisites

- Node.js 20+
- MongoDB Atlas or local MongoDB

## Setup

### 1. Server

```bash
cd server
cp .env.example .env
# Edit .env — set MONGODB_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, CLIENT_URL, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run seed   # WARNING: clears collections and inserts demo admin + resume-aligned sample data
npm run dev    # http://localhost:5000
```

API health check: `GET http://localhost:5000/api/health`

### 2. Client

```bash
cd client
cp .env.example .env   # optional; leave VITE_API_URL empty for dev proxy
npm install
npm run dev            # http://localhost:5173
```

The Vite dev server proxies `/api` and `/uploads` to `http://localhost:5000` (see `client/vite.config.ts`).

### 3. Admin

1. Open `http://localhost:5173/admin/login`
2. Sign in with the credentials from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `server/.env` (defaults are shown once after `npm run seed` in the terminal).

## Deployment notes

- Serve the API and static uploads (`/uploads`) from the same host **or** set `VITE_API_URL` on the frontend to your API origin.
- Set `CLIENT_URL` to your deployed site URL for CORS.
- Rotate JWT secrets and database passwords for every environment.
- Use HTTPS everywhere in production.

## Project layout

```
portfolio/
├── client/          # React SPA (public site + admin UI)
├── server/          # Express API, models, uploads
└── README.md
```

## Security reminders

- Never commit real `.env` files or database credentials.
- If database credentials were shared publicly, **rotate the password** in Atlas and update `MONGODB_URI`.

## Scripts

| Location | Command      | Purpose              |
|----------|--------------|----------------------|
| `server` | `npm run dev` | API with watch       |
| `server` | `npm run seed`| Seed / reset DB data |
| `client` | `npm run dev` | Vite dev server      |
| `client` | `npm run build` | Production build    |

## Certificate PDFs

Upload PDFs from **Admin → Certifications** or place files via **Media**. PDF previews open in a modal; visitors can download when `pdfUrl` is present.

## Resume PDF

Upload from **Admin → Settings → Resume PDF** (stored under `/uploads/documents`). The hero **Download Resume** button uses the public settings payload.
