import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: 'Frontend' },
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
    iconUrl: { type: String, default: '' },
    iconEmoji: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
