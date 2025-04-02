const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendar.controller');
const { protect , isAdmin } = require("../middlewares/authMiddleware");


// Routes for Calls
router.post("/calls", protect , calendarController.createCall);
router.get("/calls", protect , calendarController.getCalls);

// Routes for Events
router.post("/events", protect , calendarController.createEvent);
router.get("/events", protect , calendarController.getEvents);

// Routes for Tasks
router.post("/tasks", protect , calendarController.createTask);
router.get("/tasks", protect , calendarController.getTasks);

module.exports = router;
