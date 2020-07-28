const mongoose = require('mongoose');
const Page = require('../models/page');
const User = require('../models/user');


exports.getAllPages = (req, res, next) => {
  Page.find()
    .populate('admin', 'firstName lastName userName avatar')
    .exec()
    .then(pages => {
      if (pages.length > 0) {
        res.status(200).json(pages);
      } else {
        res.status(404).json({ message: 'no entries found' })
      }
    })
    .catch(error => {
      res.status(500).jsons(error)
    })

}

exports.getPage = (req, res, next) => {
  const id = req.params.pageId;
  Page.findById(id)
    .populate('admin', 'avatar firstName lastName userName')
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
