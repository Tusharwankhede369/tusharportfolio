import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as publicApi from '../controllers/publicApi.js';
import { postContact } from '../controllers/contactController.js';

const r = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: 'Too many messages from this IP. Try again in an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
});

r.get('/about', publicApi.getAbout);
r.get('/projects', publicApi.getProjects);
r.get('/skills', publicApi.getSkills);
r.get('/experience', publicApi.getExperience);
r.get('/achievements', publicApi.getAchievements);
r.get('/certifications', publicApi.getCertifications);
r.get('/education', publicApi.getEducation);
r.get('/settings', publicApi.getSettingsPublic);
r.post('/contact', contactLimiter, postContact);

export default r;
