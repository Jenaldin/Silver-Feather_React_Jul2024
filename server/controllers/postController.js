const postService = require('../services/postService');

const getAllPosts = async (req, res) => {
  try {
    const items = await postService.getAllFiltered();
    res.send(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postDetails = async (req, res) => {
  try {
    const item = await postService.getDetails(req.params.postId);
    res.send(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const payload = req.body;
  const ownerId = req.user._id;
  try {
    await postService.createPost(payload, ownerId);
    res.json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editPost = async (req, res) => {
  const { postId } = req.params;
  const payload = req.body;
  try {
    await postService.editPost(postId, payload);
    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    await postService.deletePost(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  postDetails,
  createPost,
  editPost,
  deletePost,
};