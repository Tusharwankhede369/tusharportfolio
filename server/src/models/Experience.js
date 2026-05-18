import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, default: '' },
    employmentType: { type: String, default: 'onsite' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    current: { type: Boolean, default: false },
    logoUrl: { type: String, default: '' },
    description: { type: String, default: '' },
    technologies: [{ type: String }],
    responsibilities: [{ type: String }],
    metrics: [{ label: String, value: String }],
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Experience =
  mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
