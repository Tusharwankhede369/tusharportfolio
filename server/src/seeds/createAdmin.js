import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export const ADMIN_EMAIL = 'tusharwankhede369@gmail.com';
export const ADMIN_PASSWORD = 'Tushar@05032004';

/**
 * Idempotent: creates the permanent super admin once.
 * Does not overwrite password if user already exists (change password in Atlas / admin UI if needed).
 */
export async function createAdminUser() {
  const email = ADMIN_EMAIL.toLowerCase().trim();
  const existing = await User.findOne({ email });
  if (existing) {
    if (!existing.role) {
      existing.role = 'super_admin';
      await existing.save();
    }
    console.log('[admin] Super admin already exists:', email);
    return;
  }
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await User.create({
    email,
    passwordHash,
    role: 'super_admin',
  });
  console.log('[admin] Created permanent super admin:', email);
}
