const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  passoutBatch: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  pending: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'root'],
    default: 'user'
  }
});

module.exports = mongoose.model('User', UserSchema);