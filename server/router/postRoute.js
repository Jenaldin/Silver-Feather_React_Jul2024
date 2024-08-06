const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController')

const { isAuth } = require('../middlewares/authMiddleware');
const { isPostOwner } = require('../middlewares/ownerMiddleware');

router.get('/', postController.getAllPosts);
router.get('/details/:postId', postController.postDetails);
router.post('/create', isAuth, postController.createPost);
router.put('/edit/:postId', isPostOwner, postController.editPost);
router.delete('/delete/:postId', isPostOwner, postController.deletePost);

module.exports = router;