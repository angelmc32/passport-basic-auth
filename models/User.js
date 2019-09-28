const mongoose = require('mongoose');
const { Schema , model } = mongoose;


const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
},
  { timestamps: true },
);

module.exports = model('User', userSchema);