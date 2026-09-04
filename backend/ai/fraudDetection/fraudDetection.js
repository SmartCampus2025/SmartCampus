export async function detectFraud(type, data) {
  let suspicious = false;
  let message = "";

  if (type === "finance") {
    if (data.amount > 50000) {
      suspicious = true;
      message = `Unusually high transaction: ${data.amount}`;
    }
    if (data.amount < 0) {
      suspicious = true;
      message = "Negative transaction detected!";
    }
  }

  if (type === "attendance") {
    if (data.checkInTime && data.checkOutTime) {
      const diff = new Date(data.checkOutTime) - new Date(data.checkInTime);
      if (diff < 1000 * 60 * 30) { // less than 30 minutes
        suspicious = true;
        message = "Suspiciously short attendance duration.";
      }
    }
  }

  return { alert: suspicious, message };
}