const express = require('express');
const postController = require("../controllers/post.controller");

const router = express.Router();

router.get('/',postController.getPost );
router.post('/create', postController.createPost)
router.post('/:postId/like', postController.likePost)
router.post('/:postId/unlike', postController.unlikePost)
router.post('/:postId/comment', postController.addComment)

module.exports = router;
