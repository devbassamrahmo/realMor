const Deal = require("../models/Deal");

// 1. Create a new deal
exports.createDeal = async (req, res) => {
  try {
    const {
      client,
      property,
      broker,
      bankEmployee,
      developer,
      loanAmount,
      dealPrice
    } = req.body;

    const deal = await Deal.create({
      client,
      property,
      broker,
      bankEmployee,
      developer,
      loanAmount,
      dealPrice
    });

    res.status(201).json({ message: "Deal created successfully", deal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get all deals (admin only or for testing)
exports.getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find()
      .populate("client")
      .populate("property")
      .populate("broker")
      .populate("bankEmployee")
      .populate("developer");

    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get deals by user role (bank, broker, developer)
exports.getMyDeals = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let query = {};
    if (role === "broker") query.broker = userId;
    else if (role === "developer") query.developer = userId;
    else if (role === "bank") query.bankEmployee = userId;
    else return res.status(403).json({ message: "Unauthorized role" });

    const deals = await Deal.find(query)
      .populate("client")
      .populate("property");

    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Update deal status (to completed, canceled, etc.)
exports.updateDealStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const deal = await Deal.findById(id);
    if (!deal) return res.status(404).json({ message: "Deal not found" });

    deal.status = status;
    if (status === "completed") deal.completedAt = new Date();

    await deal.save();

    res.status(200).json({ message: "Deal updated", deal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
