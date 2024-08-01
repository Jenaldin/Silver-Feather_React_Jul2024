const mongoose = require('mongoose');
const { campaignModel } = require('../models/campaignModel');

exports.getMyCampaigns = async (userId) => {
   try {
      const campaigns = await campaignModel.find({ 'owner': userId })
      return campaigns
   } catch (err) {
      throw new Error('Error fetching campaigns: ' + err.message);
   }
}