const Deal = require("../models/Deal");
const Property = require("../models/Property");
const Client = require("../models/Client");

// ========== Bank Statistics ==========
exports.getBankStats = async (req, res) => {
  try {
    const bankEmployeeId = req.user.id;

    const clientsAdded = await Client.countDocuments({ createdBy: bankEmployeeId });

    const deals = await Deal.find({ bankEmployee: bankEmployeeId });
    const totalDeals = deals.length;
    const completedDeals = deals.filter(d => d.status === "completed").length;
    const successRate = totalDeals ? (completedDeals / totalDeals * 100).toFixed(2) : 0;

    const totalLoanAmount = deals.reduce((sum, d) => sum + (d.loanAmount || 0), 0);

    const avgProcessingTime = (() => {
      const completed = deals.filter(d => d.status === "completed" && d.completedAt);
      if (completed.length === 0) return 0;
      const totalTime = completed.reduce((sum, d) => sum + (d.completedAt - d.startedAt), 0);
      return (totalTime / completed.length / (1000 * 60 * 60 * 24)).toFixed(2); // days
    })();

    const totalProperties = await Property.countDocuments();

    res.status(200).json({
      clientsAdded,
      successRate,
      avgProcessingTimeInDays: avgProcessingTime,
      totalLoanAmount,
      totalProperties
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========== Broker Statistics ==========
exports.getBrokerStats = async (req, res) => {
  try {
    const brokerId = req.user.id;

    const deals = await Deal.find({ broker: brokerId });
    const propertiesSold = deals.filter(d => d.status === "completed").length;
    const clientsManaged = new Set(deals.map(d => d.client.toString())).size;

    const visits = await Event.countDocuments({ owner: brokerId, type: "visit" });
    const successRate = visits ? (propertiesSold / visits * 100).toFixed(2) : 0;

    res.status(200).json({
      clientVisits: visits,
      propertiesSold,
      clientsManaged,
      visitSuccessRate: successRate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========== Developer Statistics ==========
exports.getDeveloperStats = async (req, res) => {
  try {
    const developerId = req.user.id;

    const properties = await Property.find({ developer: developerId });
    const propertyIds = properties.map(p => p._id.toString());

    const totalListed = properties.length;

    const visits = await Event.countDocuments({ relatedTo: { $in: propertyIds } });

    const deals = await Deal.find({ developer: developerId });
    const completedSales = deals.filter(d => d.status === "completed");
    const totalRevenue = completedSales.reduce((sum, d) => sum + d.dealPrice, 0);

    const salesTrends = await Deal.aggregate([
      { $match: { developer: developerId, status: "completed" } },
      {
        $group: {
          _id: {
            month: { $month: "$completedAt" },
            year: { $year: "$completedAt" }
          },
          revenue: { $sum: "$dealPrice" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.status(200).json({
      clientVisitTracker: visits,
      completedSales: completedSales.length,
      totalRevenue,
      salesTrends,
      numberOfPropertiesListed: totalListed,
      numberOfClientVisits: visits,
      numberOfPropertiesSold: completedSales.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
