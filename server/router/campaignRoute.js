const express = require('express');
const router = express.Router();

const CampaignController = require('../controllers/campaignController');
const { isAuth } = require('../middlewares/authMiddleware');
const { isCampaignOwner } = require('../middlewares/ownerMiddleware');

router.get('/:userId', isAuth , CampaignController.getMyCampaigns);
router.get('/details/:campaignId', isAuth, CampaignController.getCampaign);

router.post('/create', isAuth, CampaignController.createCampaign);

router.delete('/delete/:campaignId', isCampaignOwner, CampaignController.deleteCampaign);

module.exports = router;