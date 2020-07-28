const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts')

router.get('/', PostsController.getAllPosts);
router.get('/:postId', PostsController.getPost);
router.get('/:postId/comments', PostsController.getComments);
router.get('/:postId/reactions', PostsController.getReactions);
// router.post('/', PostsController.createPost);
// router.patch('/:postId', PostsController.updatePost);
// router.delete('/:postId', PostsController.deletePost);

module.exports = router;