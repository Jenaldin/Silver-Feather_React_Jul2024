const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT) || 10;

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      match: [/^[a-zA-Z0-9_-]+$/, 'Invalid username'],
      minlength: [3, 'Username should be at least 3 characters'],
      maxlength: [10, 'Username should be no more than 10 characters'],
      required: [true, 'Username is required'],
      unique: true,
   },
   email: {
      type: String,
      minlength: [10, 'Email should be at least 10 characters'],
      maxlength: [50, 'Email should be no more than 50 characters'],
      lowercase: true,
      required: [true, 'Email is required'],
      validate: {
         validator: validator.isEmail,
         message: 'Invalid email',
      },
   },
   password: {
      type: String,
      minlength: [6, 'Password should be at least 6 characters'],
      maxlength: [12, 'Password should be no more than 12 characters'],
      required: [true, 'Password is required'],
   },
   aboutMe: {
      type: String,
      maxlength: [2000, 'About me maximal length is 2000 symbols'],
      default: ' ',
   },
   charactersOwned: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
   }],
   campaignsOwned: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
   }],
   friends: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' ,
   }],
});

userSchema.pre('save', async function () {
   this.password = await bcrypt.hash(this.password, saltRounds)
});

const User = mongoose.model('User', userSchema);

module.exports = User;