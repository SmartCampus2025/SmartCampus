// backend/ai/nlQuery/queryProcessor.js
const compromise = require('compromise');

async function processQuery(query, role) {
  const doc = compromise((query || '').toLowerCase());

  if (doc.has('absent students')) {
    return { type: 'attendance', query, result: [] };
  }

  return { type: 'general', query, result: [] };
}

module.exports = {
  processQuery
};
