// backend/ai/madrassa/arabicSupport.js
function applyArabicSupport(text) {
  return {
    original: text,
    rtl: true,
    arabicText: `📖 ${text}`
  };
}

module.exports = {
  applyArabicSupport
};
