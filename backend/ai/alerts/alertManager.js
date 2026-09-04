// backend/ai/alerts/alertManager.js
module.exports = {
  sendAlert: async (type, payload) => {
    console.log(`[AlertManager] ${type}:`, payload);
    return { success: true };
  }
};
