import { madrassaSupportEngine } from "../madrassa/madrassaSupport.js";

/**
 * Madrassa Dashboard
 * Handles madrassa-specific data and integrates with other modules
 */
export async function processMadrassaData(type, data) {
  return await madrassaSupportEngine(data, type);
}