const express = require('express');
const router = express.Router();

const CampaignController = require('../controllers/campaignController');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/:userId', CampaignController.getMyCampaigns);

module.exports = router;