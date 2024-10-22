const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

router.post('/register', isGuest, authController.registerUser);
router.post('/login', isGuest, authController.loginUser);
router.get('/logout', isAuth, authController.logoutUser);

module.exports = router;