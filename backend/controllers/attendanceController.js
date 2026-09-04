const Attendance = require('../models/attendanceModel');

// Mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, date, status, classId } = req.body;
    const record = new Attendance({ studentId, date: date || new Date(), status, classId });
    await record.save();
    res.status(201).json({ message: 'Attendance marked successfully', record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get class attendance
exports.getClassAttendance = async (req, res) => {
  try {
    const { classId, date } = req.query;
    const filter = {};
    if (classId) filter.classId = classId;
    if (date) filter.date = new Date(date);
    const records = await Attendance.find(filter);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student attendance summary
exports.getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ studentId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Biometric-based attendance (plug-and-play ready)
exports.markBiometric = async (req, res) => {
  try {
    const { userId, role, type, time, biometricHash } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const query = role === 'Student' ? { studentId: userId, date: today } : { staffId: userId, date: today };

    let record = await Attendance.findOne(query);
    if (!record) {
      record = new Attendance({
        date: today,
        isBiometric: true,
        biometricHash,
        ...(role === 'Student' ? { studentId: userId } : { staffId: userId })
      });
    }

    if (type === 'in') record.inTime = time;
    else if (type === 'out') record.outTime = time;

    record.isBiometric = true;
    record.isSynced = true;
    record.biometricHash = biometricHash;

    await record.save();
    res.json({ message: 'Biometric attendance updated', record });
  } catch (err) {
    res.status(500).json({ message: 'Biometric attendance failed', error: err.message });
  }
};
