// backend/ai/madrassa/islamicCalendar.js
const moment = require('moment-hijri');

function getIslamicDate() {
  return {
    gregorian: new Date().toISOString().split('T')[0],
    hijri: moment().format('iYYYY-iMM-iDD')
  };
}

module.exports = {
  getIslamicDate
};
