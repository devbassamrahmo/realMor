const AuditLog = require("../models/AuditLog");

exports.logAction = async ({ action, user, targetType, targetId, description }) => {
  try {
    await AuditLog.create({
      action,
      user: user._id,
      role: user.role,
      targetType,
      targetId,
      description
    });
  } catch (err) {
    console.error("AuditLog error:", err.message);
  }
};