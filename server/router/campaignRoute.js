const express = require('express');
const router = express.Router();

const CampaignController = require('../controllers/campaignController');

router.get('/:userId', CampaignController.getMyCampaigns);

module.exports = router;