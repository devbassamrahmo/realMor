const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  institutionName : {type : String , required : true},
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  role: {type: String,enum: ['bank', 'ic' , 're' , 'qa' , 'admin'] , required : true},
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
