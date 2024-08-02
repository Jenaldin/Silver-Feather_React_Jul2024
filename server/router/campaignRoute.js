const express = require('express');
const router = express.Router();

const CampaignController = require('../controllers/campaignController');
const { isAuth } = require('../middlewares/authMiddleware');
const { isCampaignOwner } = require('../middlewares/ownerMiddleware');

router.get('/:userId', isAuth , CampaignController.getMyCampaigns);

module.exports = router;