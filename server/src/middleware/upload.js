import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadRoot = path.join(__dirname, '../../uploads');

function ensureDir(sub) {
  const dir = path.join(uploadRoot, sub);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    let sub = 'misc';
    if (file.mimetype.startsWith('image/')) sub = 'images';
    else if (file.mimetype === 'application/pdf') sub = 'documents';
    cb(null, ensureDir(sub));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

function fileFilter(_req, file, cb) {
  const allowed =
    file.mimetype.startsWith('image/') ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/octet-stream';
  if (!allowed) {
    return cb(new Error('Invalid file type'));
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter,
});

export { uploadRoot };
