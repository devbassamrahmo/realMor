const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  broker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming role is "broker"
    required: true,
  },
  bankEmployee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming role is "bank"
    required: true,
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming role is "developer"
    required: true,
  },
  loanAmount: {
    type: Number,
    default: 0,
  },
  dealPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "canceled"],
    default: "pending",
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("Deal", dealSchema);
