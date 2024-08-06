const mongoose = require('mongoose');
const { postModel } = require('../models/index');

exports.getOne = async (postId) => await postModel.findOne(postId);

exports.getAllFiltered = async () => {
   try {
      const posts = await postModel.find();
      posts.sort((a, b) => b.createdAt - a.createdAt);
      return posts;
   } catch (error) {
      throw new Error('Error fetching posts: ' + error.message);
   }
};

exports.getDetails = async (postId) => {
   try {
      const post = await postModel.findById(postId).populate('owner', 'username').populate('campaign', 'title').populate('character', 'name');
      return post
   } catch (error) {
      throw new Error('Error fetching requested post: ' + error.message);
   }
};

exports.createPost = async (payload, ownerId) => {  
   try {
      if(payload.campaignId !== ""){
         const createdPost = await postModel.create({
            ...payload,
            campaign: payload.campaign,
            owner: ownerId,
         });
         return createdPost ;
      }

      if(payload.characterId !== ""){
         const createdPost = await postModel.create({
            ...payload,
            character: payload.character,
            owner: ownerId,
         });
         return createdPost ;
      }
      
   } catch (error) {
      throw new Error('Error creating post: ' + error.message);
   }
};

exports.editPost = async (postId, payload) => {
   try {
      const updatedPost = await postModel.findByIdAndUpdate(postId, payload, { runValidators: true });
      return updatedPost;
   } catch (error) {
      throw new Error('Error updating post: ' + error.message);
   }
};

exports.deletePost = async (postId) => {
   try {
      await postModel.findByIdAndDelete(postId);
      return "Post deleted"
   } catch (error) {
      throw new Error('Error deleting post: ' + error.message);
   }
}