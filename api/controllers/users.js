const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');
const Friends = require('../models/friends');
const UserInfo = require('../models/user_info');
const Likes = require('../models/likes');
const Page = require('../models/page');

exports.getAllUsers = (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: 'no entries found' })
      }
    })
    .catch(error => {
      res.status(500).jsons(error)
    })

}

exports.getUser = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'invalid id' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
}


exports.getInfo = (req, res, next) => {
  const id = req.params.userId;
  UserInfo.findOne({ user: id })
    .populate('user', 'avatar firstName lastName userName')
    .exec()
    .then(user => {
      if (user) {
        console.log(user)
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'invalid id' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.getFriends = (req, res, next) => {
  const id = req.params.userId;
  Friends.findOne({ user: id })
    .populate('user', 'avatar firstName lastName userName')
    .populate({
      path: 'friends'
    })
    .exec()
    .then(user => {
      if (user) {
        console.log(user)
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'invalid id' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.getPosts = (req, res, next) => {
  const id = req.params.userId;
  Post.find({ author: id, parent: null })
    .populate('author', 'avatar firstName lastName userName')
    .exec()
    .then(posts => {
      if (posts) {
        children = posts
        const childrenIDs = posts.map(post => post._id)
        return Post.find({ parent: { $in: childrenIDs } })
          .populate('author', 'firstName lastName userName avatar')
        //res.status(200).json(posts)
      } else {
        res.status(404).json({ message: 'invalid id' })
      }
    })
    .then(posts => {
      if (posts) {
        grandchildren = posts
        all = children.map(parent => {
          parent.children = grandchildren.filter(child => { console.log(child.parent, parent._id); return child.parent.equals(parent._id) })
          return parent
        })
        res.status(200).json(all)
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.getLikes = (req, res, next) => {
  const id = req.params.userId;
  Likes.findOne({ user: id })
    .populate('user', 'avatar firstName lastName userName')
    .populate({
      path: 'pages'
    })
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'invalid id' })
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).json(error)
    })
}