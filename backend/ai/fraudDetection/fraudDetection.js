// backend/ai/fraudDetection/fraudDetection.js
function detectFraud(type, data) {
  let suspicious = false;
  let message = '';

  if (type === 'finance') {
    if (data.amount > 50000) {
      suspicious = true;
      message = `Unusually high transaction: ${data.amount}`;
    } else if (data.amount < 0) {
      suspicious = true;
      message = `Negative transaction amount: ${data.amount}`;
    }
  }

  return { suspicious, message };
}

module.exports = {
  detectFraud
};
