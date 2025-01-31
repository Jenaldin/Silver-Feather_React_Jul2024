const jwt = require('../utils/jwt');
const secret = process.env.SECRET || 'iowjf[qn395834rmcg-cnlerqx2309#%%#Q%4tcf1xu';

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers['x-authorization'];
  if (!token) {
    return next();
  };

  try {
    const decodedToken = await jwt.verify(token, secret);
    req.user = decodedToken;
    res.locals.isAuthenticated = true;
    next();
  } catch (err) {
    res.clearCookie('auth');
    res.status(401).json({ message: 'Unauthorized' });
  };
};

exports.isAuth = (req, res, next) => {
  if (!req.user._id) {
    return res.status(401).json({ message: 'Unauthorized, authenticate first' });
  };
  next();
};

exports.isGuest = (req, res, next) => {
  if (req.user) {
    return res.status(403).json({ message: 'Forbidden' });
  };
  next();
};