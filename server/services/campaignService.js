const mongoose = require('mongoose');
const { campaignModel } = require('../models/index');

exports.getMyCampaigns = async (userId) => {
   try {
      const campaigns = await campaignModel.find({ owner: userId });
      if (!campaigns || campaigns.length === 0) {
         return 'No campaigns found for the specified user.';
      }
      return campaigns;
   } catch (err) {
      throw new Error('Error fetching campaigns: ' + err.message);
   }
};