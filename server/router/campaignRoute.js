const express = require('express');
const router = express.Router();

const CampaignController = require('../controllers/campaignController');
const { isAuth } = require('../middlewares/authMiddleware');
const { isCampaignOwner } = require('../middlewares/ownerMiddleware');

router.get('/:userId', isAuth , CampaignController.getMyCampaigns);

router.get('/details/:campaignId', CampaignController.getCampaign);

router.post('/create', isAuth, CampaignController.createCampaign)

module.exports = router;