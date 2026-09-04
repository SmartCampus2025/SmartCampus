const express = require("express");
const router = express.Router();
const controller = require("../controllers/selfHealEngineController");

router.post("/log", controller.logIssue);
router.get("/logs", controller.getAllLogs);
router.put("/resolve/:id", controller.resolveIssue);
router.delete("/delete/:id", controller.deleteLog);

module.exports = router;