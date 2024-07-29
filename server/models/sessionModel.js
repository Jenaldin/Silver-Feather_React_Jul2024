const mongoose = require('mongoose');
const validator = require('validator');

const sessionSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: [2, 'Title min length is 2 symbols'],
      maxlength: [256, 'Title max length is 256 symbols'],
      required: [true, 'Title is required'],
   },
   description: {
      type: String,
      minlength: [100, 'Description/Resume min length is 100 symbols'],
      maxlength: [2000, 'Description/Resume max length is 2000 symbols'],
      required: [true, 'Description/Resume is required']
   },
   mapUrl: {
      type: String,
      validate: {
         validator: function (value) {
            return validator.isURL(value) && /^https:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value);
         },
         message: 'Invalid cover link',
      },
   },
   antagonist: {
      type: [String],
   },
   antagonistVisible:{
      type: Boolean,
      default: false
   },
   loot:{
      type: [String],
   },
   lootVisible:{
      type: Boolean,
      default: false
   },
   campaign: {
      type: mongoose.Types.ObjectId,
      ref: 'Campaign'
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   },
   isPublished: {
      type: Boolean,
      default: false
   },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;