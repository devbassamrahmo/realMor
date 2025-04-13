const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  direction: {
    type: String,
    enum: ["north", "south", "east", "west", "unspecified"],
    default: "unspecified"
  },
  district: { type: String },
  area: { type: Number, required: true },
  buildType: {
    type: String,
    enum: ["apartment", "villa", "duplex", "building", "other"],
    default: "other"
  },
  bedrooms: { type: Number, default: 1 },
  type: {
    type: String,
    enum: ["residential", "commercial", "land", "other"],
    default: "residential"
  },
  status: {
    type: String,
    enum: ["available", "reserved", "sold"],
    default: "available"
  },
  description: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
