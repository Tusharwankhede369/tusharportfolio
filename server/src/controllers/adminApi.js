import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { About } from '../models/About.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Experience } from '../models/Experience.js';
import { Achievement } from '../models/Achievement.js';
import { Certification } from '../models/Certification.js';
import { Education } from '../models/Education.js';
import { Settings } from '../models/Settings.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { logActivity } from '../middleware/activity.js';

function parseMaybeJSON(val, fallback) {
  if (val == null || val === '') return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

function parseBool(v, fallback = false) {
  if (v === true || v === 'true') return true;
  if (v === false || v === 'false') return false;
  return fallback;
}

async function maybeOptimizeImage(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return null;
  const outPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  try {
    await sharp(filePath).webp({ quality: 82 }).toFile(outPath);
    fs.unlinkSync(filePath);
    return outPath;
  } catch {
    return filePath;
  }
}

function publicUrl(req, localPath) {
  if (!localPath) return '';
  const i = localPath.indexOf('uploads');
  if (i === -1) return localPath;
  const rel = localPath.slice(i + 'uploads'.length).replace(/\\/g, '/');
  return `${req.protocol}://${req.get('host')}/uploads${rel}`;
}

export async function putAbout(req, res) {
  let doc = await About.findOne();
  if (!doc) doc = new About({});
  const body = { ...req.body };
  if (typeof body.heroRoles === 'string') {
    try {
      body.heroRoles = JSON.parse(body.heroRoles);
    } catch {
      body.heroRoles = body.heroRoles
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  Object.assign(doc, body);
  if (req.files?.photo?.[0]) {
    const fp = await maybeOptimizeImage(req.files.photo[0].path);
    doc.photoUrl = publicUrl(req, fp || req.files.photo[0].path);
  }
  await doc.save();
  await logActivity('update', 'about');
  res.json(doc);
}

export async function deleteAboutPhoto(_req, res) {
  const doc = await About.findOne();
  if (!doc) return res.status(404).json({ message: 'No about document' });
  doc.photoUrl = '';
  await doc.save();
  await logActivity('update', 'about');
  res.json(doc);
}

export async function adminDashboard(_req, res) {
  const [projects, certs, achievements, skills, experiences, messages] = await Promise.all([
    Project.countDocuments(),
    Certification.countDocuments(),
    Achievement.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    ContactMessage.countDocuments(),
  ]);
  const settings = await Settings.findOne().lean();
  res.json({
    counts: {
      projects,
      certifications: certs,
      achievements,
      skills,
      experiences,
      messages,
    },
    activityLog: settings?.activityLog?.slice(0, 15) || [],
  });
}

async function getSettingsDoc() {
  let s = await Settings.findOne();
  if (!s) s = await Settings.create({});
  return s;
}

export async function putSettings(req, res) {
  const s = await getSettingsDoc();
  const body = req.body || {};
  if (typeof body.animationsEnabled === 'boolean') s.animationsEnabled = body.animationsEnabled;
  if (body.seo) s.seo = { ...s.seo, ...body.seo };
  if (body.theme) s.theme = { ...s.theme, ...body.theme };
  if (body.socialLinks) s.socialLinks = { ...s.socialLinks, ...body.socialLinks };
  if (req.files?.resume?.[0]) {
    s.resumePdfUrl = publicUrl(req, req.files.resume[0].path);
  }
  await s.save();
  await logActivity('update', 'settings');
  res.json(s);
}

/** JSON-only settings update (SEO, socials, theme, toggles) — no file uploads */
export async function putSettingsJson(req, res) {
  const s = await getSettingsDoc();
  const body = req.body || {};
  if (typeof body.animationsEnabled === 'boolean') s.animationsEnabled = body.animationsEnabled;
  if (body.seo) s.seo = { ...s.seo, ...body.seo };
  if (body.theme) s.theme = { ...s.theme, ...body.theme };
  if (body.socialLinks) s.socialLinks = { ...s.socialLinks, ...body.socialLinks };
  await s.save();
  await logActivity('update', 'settings');
  res.json(s);
}

export async function putResumeUpload(req, res) {
  const s = await getSettingsDoc();
  if (!req.file) {
    return res.status(400).json({ message: 'Resume file required' });
  }
  s.resumePdfUrl = publicUrl(req, req.file.path);
  await s.save();
  await logActivity('update', 'resume');
  res.json(s);
}

export async function getSettings(_req, res) {
  const s = await getSettingsDoc();
  res.json(s);
}

function crud(model, name) {
  return {
    list: async (_req, res) => {
      const list = await model.find().sort({ order: 1, createdAt: -1 }).lean();
      res.json(list);
    },
    create: async (req, res) => {
      const doc = await model.create(req.body);
      await logActivity('create', name);
      res.status(201).json(doc);
    },
    update: async (req, res) => {
      const doc = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!doc) return res.status(404).json({ message: 'Not found' });
      await logActivity('update', name);
      res.json(doc);
    },
    remove: async (req, res) => {
      const doc = await model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      await logActivity('delete', name);
      res.json({ ok: true });
    },
    reorder: async (req, res) => {
      const { orderedIds } = req.body || {};
      if (!Array.isArray(orderedIds)) return res.status(400).json({ message: 'orderedIds required' });
      await Promise.all(
        orderedIds.map((id, index) => model.updateOne({ _id: id }, { order: index }))
      );
      await logActivity('reorder', name);
      res.json({ ok: true });
    },
  };
}

export const projectsAdmin = crud(Project, 'projects');
export const skillsAdmin = crud(Skill, 'skills');
export const experienceAdmin = crud(Experience, 'experience');
export const achievementsAdmin = crud(Achievement, 'achievements');
export const certificationsAdmin = crud(Certification, 'certifications');
export const educationAdmin = crud(Education, 'education');

export async function createProject(req, res) {
  const data = { ...req.body };
  data.technologies = parseMaybeJSON(data.technologies, []);
  data.features = parseMaybeJSON(data.features, []);
  data.featured = parseBool(data.featured, false);
  data.published = parseBool(data.published, true);
  if (data.startDate) data.startDate = new Date(data.startDate);
  if (data.endDate) data.endDate = new Date(data.endDate);
  if (req.files?.thumbnail?.[0]) {
    const fp = await maybeOptimizeImage(req.files.thumbnail[0].path);
    data.thumbnailUrl = publicUrl(req, fp || req.files.thumbnail[0].path);
  }
  const doc = await Project.create(data);
  await logActivity('create', 'projects');
  res.status(201).json(doc);
}

export async function updateProject(req, res) {
  const data = { ...req.body };
  if (data.technologies !== undefined) data.technologies = parseMaybeJSON(data.technologies, []);
  if (data.features !== undefined) data.features = parseMaybeJSON(data.features, []);
  if (data.featured !== undefined) data.featured = parseBool(data.featured, false);
  if (data.published !== undefined) data.published = parseBool(data.published, true);
  if (data.startDate) data.startDate = new Date(data.startDate);
  if (data.endDate) data.endDate = new Date(data.endDate);
  if (req.files?.thumbnail?.[0]) {
    const fp = await maybeOptimizeImage(req.files.thumbnail[0].path);
    data.thumbnailUrl = publicUrl(req, fp || req.files.thumbnail[0].path);
  }
  const doc = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  await logActivity('update', 'projects');
  res.json(doc);
}

export async function createCertification(req, res) {
  const data = { ...req.body };
  if (data.issueDate) data.issueDate = new Date(data.issueDate);
  data.published = parseBool(data.published, true);
  if (req.files?.pdf?.[0]) {
    data.pdfUrl = publicUrl(req, req.files.pdf[0].path);
  }
  if (req.files?.logo?.[0]) {
    const fp = await maybeOptimizeImage(req.files.logo[0].path);
    data.logoUrl = publicUrl(req, fp || req.files.logo[0].path);
  }
  const doc = await Certification.create(data);
  await logActivity('create', 'certifications');
  res.status(201).json(doc);
}

export async function updateCertification(req, res) {
  const data = { ...req.body };
  if (data.issueDate) data.issueDate = new Date(data.issueDate);
  if (data.published !== undefined) data.published = parseBool(data.published, true);
  if (req.files?.pdf?.[0]) {
    data.pdfUrl = publicUrl(req, req.files.pdf[0].path);
  }
  if (req.files?.logo?.[0]) {
    const fp = await maybeOptimizeImage(req.files.logo[0].path);
    data.logoUrl = publicUrl(req, fp || req.files.logo[0].path);
  }
  const doc = await Certification.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  await logActivity('update', 'certifications');
  res.json(doc);
}

export async function uploadGeneric(req, res) {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file' });
  const fp = await maybeOptimizeImage(file.path);
  const url = publicUrl(req, fp || file.path);
  await logActivity('upload', 'media');
  res.json({ url, path: fp || file.path });
}
