const mongoose = require('mongoose');
const user = require('./user')
const userSchema = require('./user').userSchema

const friendsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  friends: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
})

module.exports = mongoose.model('Friends', friendsSchema)