const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  full: { type: String, required: true },
  short: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);