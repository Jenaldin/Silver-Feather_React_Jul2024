const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: [10, 'Title min length is 2 symbols'],
      maxlength: [256, 'Title max length is 256 symbols'],
      required: [true, 'Title is required'],
   },
   description: {
      type: String,
      minlength: [100, 'Description/Resume min length is 100 symbols'],
      maxlength: [1000, 'Description/Resume max length is 2000 symbols'],
      required: [true, 'Description/Resume is required']
   },
   mapUrl: {
      type: String,
   },
   antagonist: {
      type: String,
   },
   antagonistVisible:{
      type: Boolean,
      default: false
   },
   loot:{
      type: String,
   },
   lootVisible:{
      type: Boolean,
      default: false
   },
   isPublished: {
      type: Boolean,
      default: false
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   campaign: {
      type: mongoose.Types.ObjectId,
      ref: 'Campaign'
   },   
   owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;