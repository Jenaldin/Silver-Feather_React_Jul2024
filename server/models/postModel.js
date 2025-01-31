const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: [10, 'Comment title minimal length is 10 symbol'],
      maxlength: [100, 'Comment title maximal length is 100 symbols'],
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
   character: {
      type: mongoose.Types.ObjectId,
      ref: 'Character',
   },
   comments: [{
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
   }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;