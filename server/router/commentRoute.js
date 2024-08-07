const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController')

const { isAuth } = require('../middlewares/authMiddleware');
const { isCommentOwner } = require('../middlewares/ownerMiddleware');

router.get('/:postId', commentController.getAllComments);
router.get('/details/:commentId', commentController.commentDetails);
router.post('/create', isAuth, commentController.createComment);
router.put('/edit/:commentId', isCommentOwner, commentController.editComment);
router.delete('/delete/:commentId', isCommentOwner, commentController.deleteComment);

module.exports = router;