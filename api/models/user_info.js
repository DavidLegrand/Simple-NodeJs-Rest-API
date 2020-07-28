const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  company: { type: String },
  job: { type: String },
  city: { type: String },
  birthDate: { type: Date, required: true },
  subscriptionDate: { type: Date, required: true },
  coverPicture: { type: String }

})

module.exports = mongoose.model('User_Info', userInfoSchema)