const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  owner: {type: String, required: true},
  title: { type: String, required: true }, 
  dueDate: { type: Date, required: true },
  location: {type: String},
  type: { type: String, required: true , enum: ['Repeat' , 'Reminder']},
  relatedTo: { type: String , required : true},
  description: { type: String , required : true},
  Participants : {type: String},
  onlineMeeting : {type: Boolean}
  
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
