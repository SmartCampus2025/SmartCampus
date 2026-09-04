// backend/services/fileStorage.js
// Minimal abstraction: implement storage upload for your chosen provider (Firebase/S3/GDrive).
// For now provide a local fallback that writes to /public/files and returns a URL.
const fs = require('fs');
const path = require('path');

async function savePdf(buffer, filename) {
  const dir = path.join(__dirname, '..', 'public', 'files');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, buffer);
  // Return web-accessible path based on your server's static hosting
  return `/files/${filename}`;
}

module.exports = { savePdf };