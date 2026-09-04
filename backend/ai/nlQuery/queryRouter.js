// /ai/nlpQuery/queryRouter.js
import { processQuery } from "./queryProcessor.js";

export async function routeQuery(query, role) {
  try {
    const result = await processQuery(query, role);
    return result;
  } catch (err) {
    console.error("Error in routing query:", err);
    return { error: "Query failed" };
  }
}
