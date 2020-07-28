const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  content: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  children:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  image: { type: String },
})

module.exports = mongoose.model('Post', postSchema)