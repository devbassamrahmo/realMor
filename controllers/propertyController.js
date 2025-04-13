const Property = require('../models/Property');
const Client = require("../models/Client");
const csv = require("csvtojson");

exports.createProperty = async (req, res) => {
  try {
    const developerId = req.user.id; 
    const {
      images,
      price,
      city,
      direction,
      district,
      area,
      buildType,
      bedrooms,
      type,
      description,
    } = req.body;
    console.log(req.body)
    const newProperty = await Property.create({
      developer: developerId,
      images,
      price,
      city,
      direction,
      district,
      area,
      buildType,
      bedrooms,
      type,
      description,
    });

    res.status(201).json({
      message: "Property added successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add property",
      error: error.message,
    });
  }
};

exports.getMyProperties = async (req, res) => {
  try {
    const developerId = req.user.id;

    const properties = await Property.find({ developer: developerId });

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

// Matching properties with updated enums
exports.findBestProperties = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const exactMatch = {
      city: client.propertyCity,
      district: client.propertyDistrict,
      type: client.propertyType, // should match one of ["residential", "commercial", ...]
      bedrooms: client.propertyBedrooms,
      price: { $lte: client.budget },
      area: { $gte: client.minSpace, $lte: client.maxSpace },
      status: "available"
    };

    let bestMatches = await Property.find(exactMatch);

    if (bestMatches.length > 0) {
      return res.status(200).json(bestMatches);
    }

    const flexibleMatch = {
      city: client.propertyCity,
      price: { $lte: client.budget * 1.2 },
      area: { $gte: client.minSpace * 0.8, $lte: client.maxSpace * 1.2 },
      status: "available"
    };

    let closestMatches = await Property.find(flexibleMatch)
      .sort({ price: 1 })
      .limit(3);

    if (closestMatches.length > 0) {
      return res.status(200).json(closestMatches);
    }

    // fallback
    let fallbackProperties = await Property.find({ status: "available" })
      .sort({ createdAt: -1 })
      .limit(3);

    return res.status(200).json(fallbackProperties);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.importPropertiesFromCSV = async (req, res) => {
  try {
    const developerId = req.user.id;
    const csvBuffer = req.file.buffer;

    const jsonArray = await csv().fromString(csvBuffer.toString());

    const formattedProperties = jsonArray.map(row => ({
      developer: developerId,
      images: row.images ? row.images.split(';') : [],
      price: Number(row.price),
      city: row.city,
      direction: row.direction,
      district: row.district,
      area: Number(row.area),
      buildType: row.buildType,
      bedrooms: Number(row.bedrooms),
      type: row.type,
      description: row.description,
      status: "available"
    }));

    const created = await Property.insertMany(formattedProperties);

    res.status(201).json({
      message: `${created.length} properties imported successfully`,
      data: created
    });
  } catch (error) {
    console.error("CSV import error:", error);
    res.status(500).json({ error: "Failed to import properties", details: error.message });
  }
};