const mongoose = require('mongoose');
const { campaignModel } = require('../models/index');

exports.getMyCampaigns = async (userId) => {
   try {
      const campaigns = await campaignModel.find({ owner: userId });
      campaigns.sort((a, b) => b.createdAt - a.createdAt);
      return campaigns;
   } catch (err) {
      throw new Error('Error fetching campaigns: ' + err.message);
   }
};