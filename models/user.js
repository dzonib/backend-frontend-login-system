const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    requried: true
  },
  email: {
    type: String,
    requried: true
  },
  password: {
    type: String,
    requried: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('user', userSchema);