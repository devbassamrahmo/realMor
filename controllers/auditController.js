const AuditLog = require("../models/AuditLog");

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("user", "firstname lastname role")
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
