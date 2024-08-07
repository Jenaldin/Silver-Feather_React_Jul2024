const mongoose = require('mongoose');
const { commentModel, postModel } = require('../models/index');

exports.getOne = async (commentId) => await commentModel.findOne(commentId);

exports.getAll = async (postId) => {
   try {
      const comments = await commentModel.find({post: postId}).populate('owner', 'username');
      comments.sort((a, b) => b.createdAt - a.createdAt);
      return comments;
   } catch (error) {
      throw new Error('Error fetching comments: ' + error);
   }
};

exports.getDetails = async (commentId) => {
   try {
      const comment = await commentModel.findById(commentId).populate('owner', 'username');
      return comment
   } catch (error) {
      throw new Error('Error fetching requested comment: ' + error.message);
   }
};

exports.createComment = async (payload, ownerId) => {  
   try {
      const createdComment = await commentModel.create({
         ...payload,
         post: payload.postId,
         owner: ownerId,
      });

      await postModel.findByIdAndUpdate(payload.post, { $push: { comments: createdComment._id } });

      return createdComment;     
   } catch (error) {
      throw new Error('Error creating comment: ' + error.message);
   }
};

exports.editComment = async (commentId, payload) => {
   try {
      const updatedComment = await commentModel.findByIdAndUpdate(commentId, payload, { runValidators: true });
      return updatedComment;
   } catch (error) {
      throw new Error('Error updating comment: ' + error.message);
   }
};

exports.deleteComment = async (commentId) => {
   try {
      await commentModel.findByIdAndDelete(commentId);
      return "Comment deleted"
   } catch (error) {
      throw new Error('Error deleting comment: ' + error.message);
   }
}