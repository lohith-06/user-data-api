const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
