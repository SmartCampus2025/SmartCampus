exports.sendError = (res, error, message = "Something went wrong") => {
  console.error("❌ Error:", error);
  res.status(500).json({
    success: false,
    message,
    error: error.message || error,
    selfHeal: true,
  });
};