import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    date: { type: Date, default: null },
    organization: { type: String, default: '' },
    awardType: { type: String, default: 'award' },
    icon: { type: String, default: '' },
    statHighlight: { type: String, default: '' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Achievement =
  mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema);
