const mongoose = require('mongoose');
const validator = require('validator');

const campaignSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: [2, 'Title min length is 2 symbols'],
      maxlength: [256, 'Title max length is 256 symbols'],
      required: [true, 'Title is required'],
   },
   setting: {
      type: String,
      required: [true, 'Campaign setting is required'],
   },
   imageUrl: {
      type: String,
      validate: {
         validator: function (value) {
            return validator.isURL(value) && /^https:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value);
         },
         message: 'Invalid image link',
      },
   },
   campaignLang: {
      type: String,
      required: [true, 'Language the campaign is in is required']
   },
   description: {
      type: String,
      minlength: [100, 'Description/Resume min length is 100 symbols'],
      maxlength: [2000, 'Description/Resume max length is 2000 symbols'],
      required: [true, 'Description/Resume is required']
   },
   partySize: {
      type: Number,
      min: 2,
      max: 8,
      required: [true, 'Party size is required initially'],
   },
   charactersPlaying: [{
      type: mongoose.Types.ObjectId,
      ref: 'Character',
   }],
   charactersInvited: [{
      type: mongoose.Types.ObjectId,
      ref: 'Character',
   }],
   charactersRequesting: [{
      type: mongoose.Types.ObjectId,
      ref: 'Character',
   }],
   sessionsOfCampaign:
   [{
      user: {
         type: mongoose.Types.ObjectId,
         ref: 'Session'
      },
      requestedOn: {
         type: Date,
         default: Date.now
      }
   }],
   createdDate: {
      type: Date,
   },
   owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   },
   isPublic: {
      type: Boolean,
      default: false
   },
   isPublished: {
      type: Boolean,
      default: false
   },
});

campaignSchema.pre('save', function () {
   if (!this.createdDate) {
      this.createdDate = Date.now();
   };
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;