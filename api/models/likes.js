const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true }],
})

module.exports = mongoose.model('Likes', likesSchema)