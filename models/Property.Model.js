const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  images: [String], 
  price: { type: Number, required: true },
  city: { type: String, required: true },
  direction: { type: String },
  district: { type: String },
  area: { type: Number, required: true },
  buildType: { type: String },
  bedrooms: { type: Number },
  type: { type: String }, 
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
