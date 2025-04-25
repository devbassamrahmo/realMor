const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { protect } = require("../middlewares/authMiddleware");

// حسب دور المستخدم
router.get("/bank", protect, dashboardController.getBankStats);
router.get("/broker", protect, dashboardController.getBrokerStats);
router.get("/developer", protect, dashboardController.getDeveloperStats);

module.exports = router;
