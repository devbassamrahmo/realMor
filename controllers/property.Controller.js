const Property = require('../models/Property.model');
const Client = require("../models/Client.model");
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


// Function to find the best matching properties
exports.findBestProperties = async (req, res) => {
  try {
      const { clientId } = req.params;
      const client = await Client.findById(clientId);
      if (!client) {
          return res.status(404).json({ error: "Client not found" });
      }

      // Search for properties that exactly match the client's preferences
      let bestMatches = await Property.find({
          city: client.propertyCity,
          district: client.propertyDistrict,
          type: client.propertyType,
          bedrooms: client.propertyBedrooms,
          price: { $lte: client.budget },
          area: { $gte: client.minSpace, $lte: client.maxSpace }
      });

      if (bestMatches.length > 0) {
          return res.status(200).json(bestMatches);
      }

      // If no exact match, find the closest 3 properties
      let closestMatches = await Property.find({
          city: client.propertyCity,
          price: { $lte: client.budget * 1.2 }, // Allow some flexibility in budget
          area: { $gte: client.minSpace * 0.8, $lte: client.maxSpace * 1.2 }
      })
      .sort({ price: 1 }) // Sort by price ascending
      .limit(3);

      return res.status(200).json(closestMatches);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
