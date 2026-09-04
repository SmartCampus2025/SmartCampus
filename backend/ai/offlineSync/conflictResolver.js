// ai/offlineSync/conflictResolver.js
// Handles conflicts when local + server data differ

class ConflictResolver {
  static resolve(localData, serverData) {
    // Simple rule: keep latest updatedAt timestamp
    if (!serverData) return localData;
    if (!localData) return serverData;

    return localData.updatedAt > serverData.updatedAt ? localData : serverData;
  }
}

module.exports = ConflictResolver;
