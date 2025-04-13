const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const { protect, isDeveloper } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

// Add new property
router.post("/add-property", protect, isDeveloper, propertyController.createProperty);

// Get all properties for current developer
router.get("/my-properties", protect, isDeveloper, propertyController.getMyProperties);

// Get best matching properties for a client
router.get("/recommend/:clientId", protect, propertyController.findBestProperties);

//Upload csv File
router.post("/import-csv", protect, isDeveloper, upload.single("file"), propertyController.importPropertiesFromCSV);

module.exports = router;
