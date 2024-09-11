const asyncHandler = require("express-async-handler");
const Post = require('../models/Post');

exports.createPost = asyncHandler(async (req, res) => {
  const { content, userId } = req.body;
 try {
    const post = new Post({ content, user: userId });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.getPost = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().populate('user').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    post.likes.push(userId);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.unlikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes = post.likes.filter(like => like.toString() !== userId);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.addComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId, text } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ user: userId, text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});