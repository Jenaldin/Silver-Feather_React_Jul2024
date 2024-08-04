const bcrypt = require('bcrypt');

const generateToken = require('../utils/tkn');
const { userModel } = require('../models/index');

exports.register = async (userData) => {
   try {
      if (userData.password !== userData.rePass) {
         throw new Error('Password mismatch');
      };
   
      const user = await userModel.findOne({ username: userData.username });
      if (user) {
         throw new Error('This Username already exists!');
      };
   
      const createdUser = await userModel.create(userData);
      const token = await generateToken(createdUser);
      return { token, username: createdUser.username, id: createdUser._id };
   } catch (error) {
      throw new Error('Error registering a user: ' + error.message);
   }
};

exports.login = async ({ username, password }) => {
   try {
      const user = await userModel.findOne({ username });
      if (!user) {
         throw new Error('Username or password is invalid');
      };
   
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
         throw new Error('Username or password is invalid');
      };
   
      const token = await generateToken(user);
      return { token, username: user.username, id: user._id };
   } catch (error) {
      throw new Error('Error registering a user: ' + error.message);
   }
};