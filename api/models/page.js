const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  slogan: { type: String },
  description: { type: String },
  coverPicture: { type: String },
  avatar: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model('Page', pageSchema)