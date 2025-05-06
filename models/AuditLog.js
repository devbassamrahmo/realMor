const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // create, update, delete, login...
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: { type: String }, // bank, ic, re, etc.
  targetType: { type: String }, // مثل: Property, Client, Deal
  targetId: { type: String },
  description: { type: String }, // "User X added a new Property in Damascus"
}, { timestamps: true });

module.exports = mongoose.model("AuditLog", auditLogSchema);
