// /ai/nlpQuery/queryProcessor.js
import nlp from "compromise"; // lightweight NLP lib
import db from "../../db/connection.js";

export async function processQuery(query, role) {
  const doc = nlp(query.toLowerCase());

  if (doc.has("absent students")) {
    return await db("attendance").where("status", "absent");
  }

  if (doc.has("fee defaulters")) {
    return await db("fees").where("status", "unpaid");
  }

  if (doc.has("top performers")) {
    return await db("results").orderBy("marks", "desc").limit(10);
  }

  if (doc.has("my attendance") && role === "student") {
    return await db("attendance").where("studentId", role.userId);
  }

  return { message: "Sorry, I couldn't understand that query yet." };
}
