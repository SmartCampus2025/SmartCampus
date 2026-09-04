// ai/offlineSync/offlineCache.js
// Handles local caching of data when offline

const localforage = require("localforage");

// Configure local storage
localforage.config({
  name: "SmartCampus",
  storeName: "offline_data"
});

class OfflineCache {
  static async save(key, data) {
    await localforage.setItem(key, data);
    console.log(`[OfflineCache] Data saved for ${key}`);
  }

  static async get(key) {
    return await localforage.getItem(key);
  }

  static async remove(key) {
    await localforage.removeItem(key);
  }

  static async getAllKeys() {
    return await localforage.keys();
  }
}

module.exports = OfflineCache;
