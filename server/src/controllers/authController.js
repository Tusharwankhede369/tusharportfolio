import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const user = await User.findOne({ email: String(email).toLowerCase().trim() });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const payload = { sub: user._id.toString(), email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const refreshHash = await bcrypt.hash(refreshToken, 10);
  user.refreshTokenHash = refreshHash;
  await user.save();
  return res.json({
    accessToken,
    refreshToken,
    user: { email: user.email, id: user._id },
  });
}

export async function refreshToken(req, res) {
  const { refreshToken: token } = req.body || {};
  if (!token) return res.status(400).json({ message: 'Refresh token required' });
  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
  const user = await User.findById(payload.sub);
  if (!user?.refreshTokenHash || !(await bcrypt.compare(token, user.refreshTokenHash))) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
  const nextPayload = { sub: user._id.toString(), email: user.email };
  const accessToken = signAccessToken(nextPayload);
  const refreshTokenNew = signRefreshToken(nextPayload);
  user.refreshTokenHash = await bcrypt.hash(refreshTokenNew, 10);
  await user.save();
  return res.json({ accessToken, refreshToken: refreshTokenNew });
}

export async function logout(req, res) {
  const user = await User.findById(req.user?.sub);
  if (user) {
    user.refreshTokenHash = null;
    await user.save();
  }
  return res.json({ ok: true });
}
