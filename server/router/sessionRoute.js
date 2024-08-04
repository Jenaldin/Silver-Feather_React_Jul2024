const express = require('express');
const router = express.Router();

const SessionController = require('../controllers/sessionController');
const { isAuth } = require('../middlewares/authMiddleware');
const { isSessionOwner } = require('../middlewares/ownerMiddleware');

router.get('/:campaignId', isAuth , SessionController.getSessions);
router.get('/details/:sessionId', isAuth, SessionController.getSessionDetails);
router.post('/create', isAuth, SessionController.createSession);
router.put('/edit/:sessionId', isSessionOwner, SessionController.editSession)
router.delete('/delete/:sessionId', isSessionOwner, SessionController.deleteSession);

module.exports = router;