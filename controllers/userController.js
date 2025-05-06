const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { logAction } = require("../utils/logAction");
require("dotenv").config();

// const nodemailer = require("nodemailer");
const saltRounds = 10;

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

const registerUser = async (req, res) => {
    try {
      
      const { firstname, lastname, institutionName , email, password, phoneNumber , role} = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "user already exist!" });
  
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({
        firstname, lastname, institutionName, email, password: hashedPassword, phoneNumber, role});
  
      await newUser.save();

      res.status(201).json({ message: "user successfully registered!" });
    } catch (error) {
      res.status(500).json({ message: "ERROR HAPPEND", error: error.message });
    }
};
  
const loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id , firstName : user.firstname , email : user.email , role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    await logAction({
      action: "login",
      user,
      targetType: "User",
      targetId: user._id,
      description: `${user.firstname} logged in`
    });
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ message: "Login successful", user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, phoneNumber } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, username, email, phoneNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

const logout = async (req,res) =>{
  try {
    // Remove the refresh token from the user document
    req.user.refreshToken = null;
    await req.user.save();

    res.status(200).json({ message: "Logged out successfully" });
} catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
}
}






module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  logout
};
