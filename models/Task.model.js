const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  owner: {type: String, required: true},
  taskName: { type: String, required: true }, 
  dueDate: { type: Date, required: true },
  type: { type: String, required: true , enum: ['Repeat' , 'Reminder']},
  relatedTo: { type: String , required : true},
  description: { type: String , required : true},
  priority : {type: Boolean},
  completed : {type: Boolean}
  
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
