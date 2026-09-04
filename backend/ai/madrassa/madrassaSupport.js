// backend/ai/madrassa/madrassaSupport.js
const { applyArabicSupport } = require('./arabicSupport');
const { getIslamicDate } = require('./islamicCalendar');
const alertManager = require('../alerts/alertManager');

async function applyMadrassaSupport(title) {
  const arabicInfo = applyArabicSupport(title);
  const dateInfo = getIslamicDate();
  return {
    arabicInfo,
    dateInfo,
    title
  };
}

module.exports = {
  applyMadrassaSupport
};
