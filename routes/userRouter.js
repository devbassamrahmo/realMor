const express = require("express");
const router = express.Router();
const cors = require("cors");
const { protect , isAdmin} = require("../middlewares/authMiddleware");
  
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  logout
} = require("../controllers/userController");
router.use(cors());

router.post("/register", registerUser); 
router.post("/login", loginUser);
router.get("/", protect, isAdmin , getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post('/logout' , protect , logout);
module.exports = router;
