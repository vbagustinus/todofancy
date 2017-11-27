const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title : { type: String },
  status : { type: Boolean, default: false },
  remainder : Date,
  user_id: {
    type: Schema.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('task', taskSchema);
