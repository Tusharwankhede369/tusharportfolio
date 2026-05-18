import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, default: 'Full Stack Developer' },
    tagline: { type: String, default: '' },
    bio: { type: String, default: '' },
    professionalSummary: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedInUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    heroRoles: [{ type: String }],
    heroIntro: { type: String, default: '' },
    yearsOfExperience: { type: Number, default: 0 },
    projectsCompleted: { type: Number, default: 0 },
    technologiesMastered: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const About = mongoose.models.About || mongoose.model('About', aboutSchema);
