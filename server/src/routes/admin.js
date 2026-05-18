import { Router } from 'express';
import * as auth from '../controllers/authController.js';
import * as admin from '../controllers/adminApi.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const r = Router();

r.post('/login', auth.login);
r.post('/refresh-token', auth.refreshToken);
r.post('/logout', requireAuth, auth.logout);

r.use(requireAuth);

r.get('/dashboard', admin.adminDashboard);
r.get('/settings', admin.getSettings);
r.put('/settings', admin.putSettingsJson);
r.post('/settings/resume', upload.single('resume'), admin.putResumeUpload);

r.put(
  '/about',
  upload.fields([{ name: 'photo', maxCount: 1 }]),
  admin.putAbout
);
r.delete('/about/photo', admin.deleteAboutPhoto);

r.get('/projects', admin.projectsAdmin.list);
r.post(
  '/projects',
  upload.fields([{ name: 'thumbnail', maxCount: 1 }]),
  admin.createProject
);
r.put(
  '/projects/:id',
  upload.fields([{ name: 'thumbnail', maxCount: 1 }]),
  admin.updateProject
);
r.delete('/projects/:id', admin.projectsAdmin.remove);
r.post('/projects/reorder', admin.projectsAdmin.reorder);

r.get('/skills', admin.skillsAdmin.list);
r.post('/skills', admin.skillsAdmin.create);
r.put('/skills/:id', admin.skillsAdmin.update);
r.delete('/skills/:id', admin.skillsAdmin.remove);
r.post('/skills/reorder', admin.skillsAdmin.reorder);

r.get('/experience', admin.experienceAdmin.list);
r.post('/experience', admin.experienceAdmin.create);
r.put('/experience/:id', admin.experienceAdmin.update);
r.delete('/experience/:id', admin.experienceAdmin.remove);
r.post('/experience/reorder', admin.experienceAdmin.reorder);

r.get('/achievements', admin.achievementsAdmin.list);
r.post('/achievements', admin.achievementsAdmin.create);
r.put('/achievements/:id', admin.achievementsAdmin.update);
r.delete('/achievements/:id', admin.achievementsAdmin.remove);
r.post('/achievements/reorder', admin.achievementsAdmin.reorder);

r.get('/certifications', admin.certificationsAdmin.list);
r.post(
  '/certifications',
  upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  admin.createCertification
);
r.put(
  '/certifications/:id',
  upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  admin.updateCertification
);
r.delete('/certifications/:id', admin.certificationsAdmin.remove);
r.post('/certifications/reorder', admin.certificationsAdmin.reorder);

r.get('/education', admin.educationAdmin.list);
r.post('/education', admin.educationAdmin.create);
r.put('/education/:id', admin.educationAdmin.update);
r.delete('/education/:id', admin.educationAdmin.remove);
r.post('/education/reorder', admin.educationAdmin.reorder);

r.post('/upload', upload.single('file'), admin.uploadGeneric);

export default r;
