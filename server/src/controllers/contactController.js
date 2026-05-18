import nodemailer from 'nodemailer';
import validator from 'validator';
import { ContactMessage } from '../models/ContactMessage.js';

export async function postContact(req, res) {
  const { name, email, subject, message } = req.body || {};
  const ip = req.ip || req.socket?.remoteAddress || '';

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Name, email, subject, and message are required' });
  }
  if (!validator.isEmail(String(email))) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
  if (String(message).trim().length < 10) {
    return res.status(400).json({ message: 'Message must be at least 10 characters' });
  }

  const doc = await ContactMessage.create({
    name: String(name).trim().slice(0, 120),
    email: String(email).trim().toLowerCase().slice(0, 120),
    subject: String(subject).trim().slice(0, 200),
    message: String(message).trim().slice(0, 8000),
    ip: String(ip).slice(0, 64),
    emailSent: false,
  });

  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const mailTo = process.env.CONTACT_MAIL_TO || 'tusharwankhede369@gmail.com';

  if (!smtpUser || !smtpPass) {
    console.warn('[contact] SMTP not configured — stored message id:', doc._id);
    return res.json({
      ok: true,
      message:
        'Thank you — your message was received. (Configure SMTP_USER + SMTP_PASS on the server to enable email delivery.)',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: mailTo,
      replyTo: doc.email,
      subject: `Portfolio Contact: ${doc.subject}`,
      text: `Name: ${doc.name}\nEmail: ${doc.email}\n\nMessage:\n${doc.message}`,
    });

    doc.emailSent = true;
    await doc.save();
    return res.json({ ok: true, message: "Thank you! I'll get back to you soon." });
  } catch (err) {
    console.error('[contact] SMTP error:', err);
    doc.emailError = String(err?.message || err).slice(0, 500);
    await doc.save();
    return res.status(502).json({
      message:
        'Your message was saved, but email could not be sent right now. Please try again later or email directly.',
    });
  }
}
