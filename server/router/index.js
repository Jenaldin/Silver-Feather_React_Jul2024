const router = require('express').Router();

const test = require('./testRoute');
const auth = require('./authRoute');
const character = require('./characterRoute');
const campaign = require('./campaignRoute');
const session = require('./sessionRoute');
const post = require('./postRoute');
const comment = require('./commentRoute');

router.use('/', test);
router.use('/user', auth);
// router.use('/character', character);
router.use('/campaign', campaign);
router.use('/session', session);
// router.use('/post', post);
// router.use('/comment', comment);

module.exports = router;