const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email :String
});

const User = mongoose.model('user', userSchema);
module.exports = User;
