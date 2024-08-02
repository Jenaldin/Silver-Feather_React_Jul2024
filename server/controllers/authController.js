const authService = require('../services/authService');

const registerUser = async (req, res) => {
   const userData = req.body;
   try {
      const result = await authService.register(userData);
      const { token, username, id } = result;
      res.status(200).json({ message: 'Registration successful', username, id });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   };
};

const loginUser = async (req, res) => {
   const loginData = req.body;
   try {
      const result = await authService.login(loginData);
      const { token, username, id } = result;
      res.status(200).json({ message: 'Login successful', token, username, id });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   };
};

const logoutUser = async (req, res) => {
   console.log("test enter logout final");
   try {
      res.clearCookie('auth');
      res.status(200).json({ message: 'Logout successful' });
   } catch (err) {
      const errMsg = err.message;
      if (err.name === 'ValidationError') {
         res.status(400).json({ message: errMsg });
      } else {
         res.status(500).json({ message: errMsg });
      }
   };
};


module.exports = {
   registerUser,
   loginUser,
   logoutUser,
   //getUser,
   // getMyUser,
   // editMyUser,
}