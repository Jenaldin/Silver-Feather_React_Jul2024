const jwt = require('./jwt');
const secret = process.env.SECRET;

function generateToken(user) {
   const payload = {
      _id: user._id,
      username: user.username,
   };
   return jwt.sign(payload, secret, { expiresIn: '3h' });
};

module.exports = generateToken;