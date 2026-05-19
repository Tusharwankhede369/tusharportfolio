import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, '../uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const app = express();
const PORT = process.env.PORT || 5000;
const clientOrigin = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');

app.set('trust proxy', 1);
// Avoid 304 + empty body in browsers/XHR — breaks SPA JSON clients (React Query)
app.set('etag', false);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
});
app.use('/api/admin/login', authLimiter);

app.use('/uploads', express.static(uploadDir));

app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, private');
  next();
});

app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Server error',
  });
});

connectDB()
  .then(async () => {
    const { createAdminUser } = await import('./seeds/createAdmin.js');
    const { ensurePortfolioSeed } = await import('./seeds/seedDatabase.js');
    await createAdminUser();
    await ensurePortfolioSeed();
    app.listen(PORT, () => console.log(`API listening on http://127.0.0.1:${PORT}`));
  })
  .catch((e) => {
    console.error(e);
    const msg = String(e?.message ?? e);
    if (msg.includes('whitelist') || msg.includes('ServerSelection') || msg.includes('ReplicaSet')) {
      console.error('\n[MongoDB] Atlas is blocking this machine. Fix it:\n');
      console.error('  1. MongoDB Atlas → Network Access → Add IP Address');
      console.error('  2. Click "Add Current IP Address", or for testing use 0.0.0.0/0 (allow anywhere — dev only)');
      console.error('  3. Wait ~1 minute, then run: npm run dev\n');
    }
    process.exit(1);
  });
