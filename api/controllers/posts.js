const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');
const Reaction = require('../models/reaction');


exports.getAllPosts = (req, res, next) => {
  Post.find()
    .populate('author', 'firstName lastName userName avatar')
    .exec()
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'no entries found' })
      }
    })
    .catch(error => {
      res.status(500).jsons(error)
    })

}

exports.getPost = (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id)
    .populate('author', 'avatar firstName lastName userName')
    .exec()
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: 'invalid id' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
}


exports.getReactions = (req, res, next) => {
  const id = req.params.postId;
  Reaction.findOne({ post: id })
    .populate('author', 'avatar firstName lastName userName')
    .exec()
    .then(reaction => {
      if (reaction) {
        res.status(200).json(reaction)
      } else {
        res.status(404).json({ message: 'invalid id' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.getComments = (req, res, next) => {
  const id = req.params.postId;
  let children, grandchildren, all;
  Post.find({ parent: id })
    .populate('author', 'firstName lastName userName avatar')
    .exec()
    .then(posts => {
      if (posts) {
        children = posts
        const childrenIDs = posts.map(post => post._id)

        return Post.find({ parent: { $in: childrenIDs } })
          .populate('author', 'firstName lastName userName avatar')
        //res.status(200).json(comments)
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

// exports.createPost = (req, res, next) => {
//   User.findById(req.body.author)
//     .populate('author')
//     .then(user => {
//       if (!user) {
//         return res.status(404).json({ message: "author not found" })
//       }
//       const post = new Post({
//         _id: new mongoose.Types.ObjectId(),
//         content: req.body.content,
//         date: new Date(),
//         author: req.body.author
//       })
//       return post.save()
//     })
//     .then(result => {
//       res.status(201).json(post)
//     })
//     .catch(error => {
//       res.status(500).json(error)
//     })
// }



// exports.updatePost = (req, res, next) => {
//   const id = req.params.postId;
//   const updateOps = {}
//   for (const ops of req.body) {
//     updateOps[ops.prop] = ops.value
//   }
//   Post.updateOne({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(post => {
//       res.status(200).json(post)
//     })
//     .catch(error => {
//       res.status(500).json(error)
//     })
// }

// exports.deletePost = (req, res, next) => {
//   const id = req.params.postId;
//   Post.remove({ _id: id })
//     .exec()
//     .then(result => {
//       res.status(200).json(result)
//     })
//     .catch(error => {
//       res.status(500).json(error)
//     })

// }