const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.Controller");
const { protect , isAdmin} = require("../middlewares/authMiddleware");

// ✅ Add new property (form way)
router.post("/add-property", protect, propertyController.createProperty);

// ✅ Get all properties for current developer
router.get("/my-properties", protect, propertyController.getMyProperties);

module.exports = router;
