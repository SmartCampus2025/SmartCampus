// ai/offlineSync/statusNotifier.js
// Notifies users about offline/sync status

class StatusNotifier {
  static notify(message) {
    console.log("[Notifier]", message);

    // Example: show toast notification
    if (typeof window !== "undefined") {
      const event = new CustomEvent("statusUpdate", { detail: message });
      window.dispatchEvent(event);
    }
  }
}

module.exports = StatusNotifier;
