import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { createAdminUser } from './createAdmin.js';
import { ensurePortfolioSeed } from './seedDatabase.js';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

await connectDB();
await createAdminUser();
if (process.argv.includes('--force')) {
  process.env.FORCE_SEED_DB = 'true';
}
await ensurePortfolioSeed();
await mongoose.disconnect();
console.log('Seed finished.');
process.exit(0);
