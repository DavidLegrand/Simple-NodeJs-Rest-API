const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  type: { type: String, required: true },
})

module.exports = mongoose.model('Reaction', reactionSchema)