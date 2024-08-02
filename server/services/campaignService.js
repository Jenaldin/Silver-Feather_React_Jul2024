const mongoose = require('mongoose');
const { campaignModel, userModel } = require('../models/index');

exports.getMyCampaigns = async (userId) => {
   try {
      const campaigns = await campaignModel.find({ owner: userId });
      campaigns.sort((a, b) => b.createdAt - a.createdAt);
      return campaigns;
   } catch (err) {
      throw new Error('Error fetching campaigns: ' + err.message);
   }
};

exports.addNew = async (payload, ownerId) => {
   console.log(payload);
   const createdCampaign = await campaignModel.create({
      ...payload,
      owner: ownerId,
   })
   await userModel.findByIdAndUpdate(ownerId, { $push: { campaignsOwned: createdCampaign._id } });
   return createdCampaign;
};