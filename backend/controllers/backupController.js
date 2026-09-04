const { exec } = require('child_process');
const path = require('path');

exports.backupDatabase = async (req, res) => {
  const backupPath = path.join(__dirname, '../backup', `backup-${Date.now()}.gz`);
  const cmd = `mongodump --uri="${process.env.MONGODB_URI}" --archive=${backupPath} --gzip`;

  exec(cmd, (error) => {
    if (error) return res.status(500).json({ error: 'Backup failed' });
    res.json({ message: 'Backup successful', path: backupPath });
  });
};

exports.restoreDatabase = async (req, res) => {
  const backupFile = req.body.backupPath;
  const cmd = `mongorestore --uri="${process.env.MONGODB_URI}" --archive=${backupFile} --gzip --drop`;

  exec(cmd, (error) => {
    if (error) return res.status(500).json({ error: 'Restore failed' });
    res.json({ message: 'Restore successful' });
  });
};