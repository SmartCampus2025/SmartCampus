// backend/controllers/markSheetController.js
const marksheetService = require('../services/marksheetService');

exports.shareMarksheet = async (req, res) => {
  try {
    const { studentId, examId, channels = ['sms','email'], recipients = {} } = req.body;
    if (!studentId || !examId) return res.status(400).json({ error: 'studentId and examId required' });

    const result = await marksheetService.share({ studentId, examId, channels, recipients, sharedBy: req.user.id });
    return res.json(result);
  } catch (err) {
    console.error('shareMarksheet', err);
    return res.status(500).json({ error: 'Failed to share marksheet' });
  }
};

exports.download = async (req, res) => {
  try {
    const { studentId, examId } = req.params;
    const buffer = await marksheetService.getPdfBuffer(studentId, examId);
    res.set('Content-Type', 'application/pdf');
    res.send(buffer);
  } catch (err) {
    console.error('download marksheet', err);
    res.status(404).send('Not found');
  }
};
