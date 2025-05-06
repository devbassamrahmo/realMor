const express = require("express");
const router = express.Router();
const auditController = require("../controllers/auditController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", protect, isAdmin, auditController.getAllLogs);

module.exports = router;
