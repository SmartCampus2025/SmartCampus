// ai/offlineSync/syncManager.js
// Detects connectivity and syncs cached data to server

const OfflineCache = require("./offlineCache");
const ConflictResolver = require("./conflictResolver");
const StatusNotifier = require("./statusNotifier");

class SyncManager {
  static async syncToServer(apiClient) {
    try {
      const keys = await OfflineCache.getAllKeys();

      for (const key of keys) {
        const localData = await OfflineCache.get(key);
        const serverData = await apiClient.fetchData(key);

        const resolved = ConflictResolver.resolve(localData, serverData);

        await apiClient.updateData(key, resolved);
        await OfflineCache.remove(key);

        StatusNotifier.notify(`✅ Synced ${key} successfully`);
      }
    } catch (err) {
      console.error("[SyncManager] Sync failed:", err);
    }
  }

  static startMonitoring(apiClient) {
    window.addEventListener("online", () => {
      StatusNotifier.notify("🌐 Internet restored, syncing data...");
      this.syncToServer(apiClient);
    });
  }
}

module.exports = SyncManager;
