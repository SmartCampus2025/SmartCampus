// ai/nlQuery/queryExecutor.js
// Executes mapped queries on the database

const db = require("../../config/db");

async function executeQuery(sql) {
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    console.error("Query Execution Error:", err);
    return { error: "Unable to process query" };
  }
}

module.exports = { executeQuery };
