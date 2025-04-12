const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activity.controller");
const { protect } = require("../middlewares/authMiddleware");

// Unified routes
router.post("/", protect, activityController.createActivity);          // ?activityType=task
router.get("/", protect, activityController.getMyActivities);         // ?activityType=event
router.put("/:id", protect, activityController.updateActivity);       // ?activityType=call
router.delete("/:id", protect, activityController.deleteActivity);    // ?activityType=task
router.get("/all", protect, activityController.getAllActivities);


module.exports = router;
