const express = require("express");
const router = express.Router();
const dealController = require("../controllers/dealController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

// 🔒 Create a new deal (by broker or bank usually)
router.post("/", protect, dealController.createDeal);

// 🔒 Get all deals (admin only)
router.get("/all", protect, isAdmin, dealController.getAllDeals);

// 🔒 Get deals related to current user (broker, developer, bank)
router.get("/my-deals", protect, dealController.getMyDeals);

// 🔒 Update status of a deal (broker, bank, or admin)
router.patch("/:id/status", protect, dealController.updateDealStatus);

module.exports = router;
