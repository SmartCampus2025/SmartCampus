// ai/taskAutomationController.js
const taskAutomationService = require('./taskAutomationService');

exports.runAutomation = async (req, res, next) => {
  try {
    const result = await taskAutomationService.runAllTasks();
    res.status(200).json({
      success: true,
      message: "AI Task Automation executed successfully",
      details: result,
    });
  } catch (error) {
    next(error);
  }
};
