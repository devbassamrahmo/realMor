const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");
const { protect, isDeveloper } = require("../middlewares/authMiddleware");

// Add new property
router.post("/add-property", protect, isDeveloper, propertyController.createProperty);

// Get all properties for current developer
router.get("/my-properties", protect, isDeveloper, propertyController.getMyProperties);

// Get best matching properties for a client
router.get("/recommend/:clientId", protect, propertyController.findBestProperties);

module.exports = router;
