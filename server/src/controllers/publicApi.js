import { About } from '../models/About.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Experience } from '../models/Experience.js';
import { Achievement } from '../models/Achievement.js';
import { Certification } from '../models/Certification.js';
import { Education } from '../models/Education.js';
import { Settings } from '../models/Settings.js';

function normalizeUploadsPaths(req, value) {
  if (value == null) return value;
  if (Array.isArray(value)) {
    return value.map((item) => normalizeUploadsPaths(req, item));
  }
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, normalizeUploadsPaths(req, val)])
    );
  }
  if (typeof value === 'string') {
    const path = value.trim();
    const uploadsUrl = `${req.protocol}://${req.get('host')}`;
    if (path.startsWith('/uploads/')) {
      return `${uploadsUrl}${path}`;
    }
    const localUploadMatch = path.match(/^https?:\/\/(?:127\.0\.0\.1|localhost):5000(\/uploads\/.*)$/);
    if (localUploadMatch) {
      return `${uploadsUrl}${localUploadMatch[1]}`;
    }
    return path;
  }
  return value;
}

export async function getAbout(_req, res) {
  const doc = await About.findOne().lean();
  res.json(normalizeUploadsPaths(_req, doc) || {});
}

export async function getProjects(req, res) {
  const tag = req.query.tag;
  const q = { published: true };
  if (tag && tag !== 'All') {
    if (tag === 'Full Stack') {
      q.category = { $regex: /Full Stack/i };
    } else if (tag === 'AI/ML') {
      q.$or = [{ category: { $regex: /AI/i } }, { technologies: { $in: ['RAG', 'TensorFlow', 'OpenCV', 'FAISS'] } }];
    } else {
      q.$or = [{ category: tag }, { technologies: tag }];
    }
  }
  const list = await Project.find(q).sort({ order: 1, createdAt: -1 }).lean();
  res.json(normalizeUploadsPaths(req, list));
}

export async function getSkills(_req, res) {
  const list = await Skill.find().sort({ order: 1, category: 1 }).lean();
  res.json(list);
}

export async function getExperience(_req, res) {
  const list = await Experience.find({ published: true }).sort({ order: 1 }).lean();
  res.json(normalizeUploadsPaths(_req, list));
}

export async function getAchievements(_req, res) {
  const list = await Achievement.find({
    published: true,
    $or: [{ visible: { $exists: false } }, { visible: true }],
  })
    .sort({ order: 1 })
    .lean();
  res.json(normalizeUploadsPaths(_req, list));
}

export async function getCertifications(_req, res) {
  const list = await Certification.find({
    published: true,
    $or: [{ visible: { $exists: false } }, { visible: true }],
  })
    .sort({ order: 1 })
    .lean();
  res.json(normalizeUploadsPaths(_req, list));
}

export async function getEducation(_req, res) {
  const list = await Education.find().sort({ order: 1 }).lean();
  res.json(normalizeUploadsPaths(_req, list));
}

export async function getSettingsPublic(_req, res) {
  const s = await Settings.findOne().lean();
  if (!s) return res.json({ seo: {}, theme: {}, animationsEnabled: true });
  res.json({
    seo: s.seo || {},
    theme: s.theme || {},
    animationsEnabled: s.animationsEnabled !== false,
    resumePdfUrl: normalizeUploadsPaths(_req, s.resumePdfUrl) || '',
    socialLinks: s.socialLinks || {},
  });
}
