import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, default: '' },
    field: { type: String, default: '' },
    grade: { type: String, default: '' },
    university: { type: String, default: '' },
    location: { type: String, default: '' },
    highlights: [{ type: String }],
    current: { type: Boolean, default: false },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education =
  mongoose.models.Education || mongoose.model('Education', educationSchema);
