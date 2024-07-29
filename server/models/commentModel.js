const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: [5, 'Comment title minimal length is 5 symbol'],
      maxlength: [35, 'Comment title maximal length is 35 symbols'],
      required: [true, 'Comment title content is required']
   },
   body: {
      type: String,
      minlength: [10, 'Comment message minimal length is 10 symbol'],
      maxlength: [1000, 'Comment message maximal length is 1000 symbols'],
      required: [true, 'Comment message is required']
   },
   owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   post: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
   }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;