// backend/routes/fraudRoutes.js

import express from "express";
import { monitorFraud } from "../ai/fraudDetection/fraudMonitor.js";

const router = express.Router();

router.post("/fraud/check", async (req, res) => {
  const { financialData, attendanceData } = req.body;

  try {
    await monitorFraud(financialData || [], attendanceData || []);
    res.json({ status: "Fraud check complete" });
  } catch (error) {
    res.status(500).json({ error: "Error running fraud detection" });
  }
});

export default router;