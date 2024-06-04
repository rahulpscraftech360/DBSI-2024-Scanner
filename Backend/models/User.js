const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    required: true
  },
  uniqueCode: {
    type: String,
    required: true
  },
  isAttended:{
    type: Boolean,
    default:false
  },
  count:{
    type: Number,
    default:0
  },
  invalidQR:{
    type: Boolean,
    default:false
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User