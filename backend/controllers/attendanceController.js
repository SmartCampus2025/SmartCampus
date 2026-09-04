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