const Property = require('../models/Property.Model');

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
