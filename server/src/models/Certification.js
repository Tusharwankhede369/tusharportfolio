import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    issuer: { type: String, default: '' },
    issueDate: { type: Date, default: null },
    credentialId: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    pdfUrl: { type: String, default: '' },
    logoUrl: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Certification =
  mongoose.models.Certification || mongoose.model('Certification', certificationSchema);
