const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users')

router.get('/', UsersController.getAllUsers);
router.get('/:userId', UsersController.getUser);
router.get('/:userId/details', UsersController.getInfo);
router.get('/:userId/friends', UsersController.getFriends);
router.get('/:userId/posts', UsersController.getPosts);
router.get('/:userId/likes', UsersController.getLikes);

module.exports = router;