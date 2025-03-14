const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const { protect , isAdmin } = require("../middlewares/authMiddleware");
// Add client
router.post('/add-client', protect ,  clientController.createClient);

// Get all clients (optional)
router.get('/clients', protect , clientController.getClients);

module.exports = router;
