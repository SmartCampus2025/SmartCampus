// ai/nlQuery/nlpProcessor.js
// Handles parsing and understanding of natural language queries

const compromise = require("compromise"); // Lightweight NLP library

function extractEntities(query) {
  const doc = compromise(query.toLowerCase());
  return {
    students: query.includes("student") || query.includes("students"),
    teachers: query.includes("teacher") || query.includes("teachers"),
    absent: query.includes("absent"),
    present: query.includes("present"),
    fee: query.includes("fee") || query.includes("fees"),
    defaulters: query.includes("defaulter") || query.includes("unpaid"),
    today: query.includes("today"),
    month: query.includes("month"),
    class: doc.match("class [#Value]").text(),
  };
}

module.exports = { extractEntities };
