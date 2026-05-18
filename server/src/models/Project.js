import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    longDescription: { type: String, default: '' },
    technologies: [{ type: String }],
    thumbnailUrl: { type: String, default: '' },
    images: [{ type: String }],
    demoUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    features: [{ type: String }],
    challenges: [{ type: String }],
    impact: { type: String, default: '' },
    achievements: [{ type: String }],
    status: { type: String, default: 'Completed' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    category: { type: String, default: 'Full Stack' },
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
