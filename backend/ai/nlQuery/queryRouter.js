// backend/ai/nlQuery/queryRouter.js
const { processQuery } = require('./queryProcessor');

async function routeQuery(query, role) {
  try {
    const result = await processQuery(query, role);
    return result;
  } catch (err) {
    console.error('Error in routing query:', err);
    return { error: err.message };
  }
}

module.exports = {
  routeQuery
};
