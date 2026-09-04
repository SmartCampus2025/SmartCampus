const AnalyticsEvent = require('../models/AnalyticsEvent');

const trackActivity = async (req, res, next) => {
  try {
    const userRole = req.user?.role || 'unknown';
    const userId = req.user?._id || null;

    const event = new AnalyticsEvent({
      userRole,
      userId,
      eventType: 'page_view',
      route: req.originalUrl,
      device: req.headers['user-agent'],
      platform: req.headers['sec-ch-ua-platform'] || 'Unknown',
      additionalInfo: {
        ip: req.ip,
        method: req.method,
      },
    });

    await event.save();
  } catch (err) {
    console.error('Analytics tracking failed:', err.message);
  }

  next();
};

module.exports = trackActivity;