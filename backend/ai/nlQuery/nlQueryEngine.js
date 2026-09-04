// ai/nlQuery/nlQueryEngine.js
// Orchestrator for Natural Language Query System

const { extractEntities } = require("./nlpProcessor");
const { mapToQuery } = require("./queryMapper");
const { executeQuery } = require("./queryExecutor");
const { formatResponse } = require("./responseFormatter");

async function processQuery(userInput) {
  const entities = extractEntities(userInput);
  const sql = mapToQuery(entities);

  if (!sql) {
    return "Sorry, I could not understand your query. Please rephrase.";
  }

  const results = await executeQuery(sql);
  return formatResponse(sql, results);
}

module.exports = { processQuery };
