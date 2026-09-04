// backend/ai/nlQuery/queryExecutor.js
const db = require('../../config/db');

async function executeQuery(sql) {
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    console.error('Query Execution Error:', err);
    return [];
  }
}

module.exports = {
  executeQuery
};
