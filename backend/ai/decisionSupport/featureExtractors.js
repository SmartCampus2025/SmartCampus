const mongoose = require('mongoose');

let Attendance, Result, Fee, User;
try { Attendance = require('../../models/attendanceModel'); } catch {}
try { Result = require('../../models/resultModel'); } catch {}
try { Fee = require('../../models/feeModel'); } catch {}
try { User = require('../../models/userModel'); } catch {}

/**
 * Compute academic and engagement features for a student.
 * Safe even if some models are missing.
 */
async function buildStudentFeatures(studentId) {
  const features = {
    attendancePct30d: null,
    avgMarksRecent: null,
    failedSubjectsRecent: 0,
    feeOutstanding: 0,
    feeStatus: 'Unknown',
    warnings: []
  };

  // Attendance last 30 days
  if (Attendance) {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const records = await Attendance.find({ studentId, date: { $gte: since } });
    if (records.length) {
      const present = records.filter(r => r.status === 'Present').length;
      features.attendancePct30d = Math.round((present / records.length) * 100);
    } else {
      features.warnings.push('No attendance records in last 30 days');
    }
  } else {
    features.warnings.push('Attendance model not found');
  }

  // Results – use latest exam per subject (simple average)
  if (Result) {
    const recent = await Result.find({ studentId }).sort({ createdAt: -1 }).limit(50);
    if (recent.length) {
      // Flatten marks into a set of latest per subject
      const latestBySubject = new Map();
      for (const r of recent) {
        if (!latestBySubject.has(r.subject)) latestBySubject.set(r.subject, r.marks);
      }
      const arr = [...latestBySubject.values()];
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      features.avgMarksRecent = Math.round(avg);
      features.failedSubjectsRecent = arr.filter(m => m < 33).length; // pass threshold 33%
    } else {
      features.warnings.push('No result records found');
    }
  } else {
    features.warnings.push('Result model not found');
  }

  // Fee status
  if (Fee) {
    const fees = await Fee.find({ studentId });
    if (fees.length) {
      const outstanding = fees
        .map(f => Math.max(0, (f.totalAmount || 0) - (f.paidAmount || 0)))
        .reduce((a, b) => a + b, 0);
      features.feeOutstanding = outstanding;
      const anyUnpaid = fees.some(f => f.status === 'Unpaid' || f.status === 'Partially Paid');
      features.feeStatus = anyUnpaid ? 'Pending' : 'Cleared';
    } else {
      features.feeStatus = 'No Records';
    }
  } else {
    features.warnings.push('Fee model not found');
  }

  // Basic student meta
  if (User) {
    const u = await User.findById(studentId).select('name class phone parentPhone');
    features.studentMeta = u || null;
  }

  return features;
}

/**
 * Finance-wide features (e.g., risk of defaults upcoming 14 days)
 */
async function buildFinanceFeatures() {
  const out = {
    pendingCount: 0,
    totalOutstanding: 0,
    dueSoon: 0,
    dueSoonTotal: 0
  };

  if (!Fee) return { ...out, warning: 'Fee model not found' };

  const all = await Fee.find({});
  out.pendingCount = all.filter(f => f.status !== 'Paid').length;
  out.totalOutstanding = all
    .map(f => Math.max(0, (f.totalAmount || 0) - (f.paidAmount || 0)))
    .reduce((a, b) => a + b, 0);

  const soon = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  const dueSoon = all.filter(f => f.dueDate && f.dueDate <= soon && f.status !== 'Paid');
  out.dueSoon = dueSoon.length;
  out.dueSoonTotal = dueSoon
    .map(f => Math.max(0, (f.totalAmount || 0) - (f.paidAmount || 0)))
    .reduce((a, b) => a + b, 0);

  return out;
}

module.exports = {
  buildStudentFeatures,
  buildFinanceFeatures,
};
