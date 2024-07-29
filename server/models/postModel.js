const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: [5, 'Comment title minimal length is 5 symbol'],
      maxlength: [35, 'Comment title maximal length is 35 symbols'],
      required: [true, 'Comment title content is required'],
   },
   body: {
      type: String,
      minlength: [10, 'Comment message minimal length is 10 symbol'],
      maxlength: [1000, 'Comment message maximal length is 1000 symbols'],
      required: [true, 'Comment message is required'],
   },
   type: {
      type: String,
      required: [true, 'Type of your post is required']
   },
   liked: {
      type: Number,
      default: 0,
   },
   usersLiked: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
   }],
   owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   campaign: {
      type: mongoose.Types.ObjectId,
      ref: 'Campaign',
   },
   comments: [{
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
   }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;