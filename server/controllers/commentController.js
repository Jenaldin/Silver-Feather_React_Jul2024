const commentService = require('../services/commentService');

const getAllComments = async (req, res) => {
  try {
    const items = await commentService.getAll();
    res.send(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const commentDetails = async (req, res) => {
  try {
    const item = await commentService.getDetails(req.params.CommentId);
    res.send(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  const payload = req.body;
  const ownerId = req.user._id;
  try {
    await commentService.createComment(payload, ownerId);
    res.json({ message: 'Comment created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editComment = async (req, res) => {
  const { CommentId } = req.params;
  const payload = req.body;
  try {
    await commentService.editComment(CommentId, payload);
    res.json({ message: 'Comment updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { CommentId } = req.params;
  try {
    await commentService.deleteComment(CommentId);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllComments,
  commentDetails,
  createComment,
  editComment,
  deleteComment,
};