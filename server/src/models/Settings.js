import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    resumePdfUrl: { type: String, default: '' },
    socialLinks: {
      linkedIn: String,
      github: String,
      twitter: String,
      email: String,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: String,
    },
    theme: {
      primary: { type: String, default: '#3B82F6' },
      accent: { type: String, default: '#8B5CF6' },
    },
    animationsEnabled: { type: Boolean, default: true },
    activityLog: [
      {
        action: String,
        resource: String,
        at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
