const mongoose = require("mongoose");

const callSchema = new mongoose.Schema({
  owner: {type: String, required: true},
  tofrom: { type: String, required: true }, 
  dueDate: { type: Date, required: true },
  reminder: { type: Boolean},
  relatedTo: { type: String , required : true},
  callType: { type: String , required : true},
  callAgenda : {type: String},
  
}, { timestamps: true });

module.exports = mongoose.model("Call", callSchema);
