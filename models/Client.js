const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  budget: { type: Number, required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId : {type: Number, required: true },
  mortgageBudget: { type: Number },
  approvedLoanAmount: { type: Number },

  propertyType: { type: String },
  propertyLocation: { type: String },
  propertyArea: { type: String },
  propertyCity: { type: String },
  propertyDistrict: { type: String },
  propertyBedrooms: { type: Number },
  propertyBathrooms: { type: Number },
  minSpace: { type: Number },
  maxSpace: { type: Number },
  status: {type: String , enum:['Waiting for Consultant' , 'Visited Developer']}  
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
