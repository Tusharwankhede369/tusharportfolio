import { Settings } from '../models/Settings.js';

export async function logActivity(action, resource) {
  try {
    let doc = await Settings.findOne();
    if (!doc) doc = await Settings.create({});
    doc.activityLog = doc.activityLog || [];
    doc.activityLog.unshift({ action, resource, at: new Date() });
    doc.activityLog = doc.activityLog.slice(0, 50);
    await doc.save();
  } catch {
    /* ignore log failures */
  }
}
