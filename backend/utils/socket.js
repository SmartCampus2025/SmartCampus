// backend/utils/socket.js
module.exports = {
  getIO: () => null,
  get: () => null,
  emit: (event, data) => console.log(`[Socket] ${event}:`, data)
};
