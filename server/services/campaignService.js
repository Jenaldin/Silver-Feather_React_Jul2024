const mongoose = require('mongoose');
const { campaignModel, userModel } = require('../models/index');

exports.getOne = async (campaignId) => await campaignModel.findOne(campaignId)

exports.getMyCampaigns = async (userId) => {
   try {
      const campaigns = await campaignModel.find({ owner: userId });
      campaigns.sort((a, b) => b.createdAt - a.createdAt);
      return campaigns;
   } catch (error) {
      throw new Error('Error fetching campaigns: ' + error.message);
   }
};

exports.getOneCampaign = async (campaignId) => {
   try {
      const campaign = await campaignModel.findById(campaignId).populate('owner', 'username');
      return campaign
   } catch (error) {
      throw new Error('Error fetching requested campaign: ' + error.message);
   }
};

exports.addNew = async (payload, ownerId) => {
   try {
      const createdCampaign = await campaignModel.create({
         ...payload,
         owner: ownerId,
      });

      await userModel.findByIdAndUpdate(ownerId, { $push: { campaignsOwned: createdCampaign._id } });

      return createdCampaign;
   } catch (error) {
      throw new Error('Error creating campaign: ' + error.message);
   }
};

exports.editCurrent = async (campaignId, payload) => {
   try {
      let newNote = {};
      const existingCampaign = await campaignModel.findById(campaignId);
      const updatedDmNotes = [...existingCampaign.dmNotes];

      if (payload.dmNotes) {
         newNote = {
            note: payload.dmNotes,
            addedDate: new Date(),
         };
         updatedDmNotes.push(newNote);
      };

      const payloadUpdated = {
         ...payload,
         dmNotes: updatedDmNotes,
      };

      const updatedCampaign = await campaignModel.findByIdAndUpdate(campaignId, payloadUpdated, { runValidators: true });
      return updatedCampaign;
   } catch (error) {
      throw new Error('Error updating campaign: ' + error.message);
   }
};

exports.deleteCurrent = async (campaignId) => {
   try {
      await campaignModel.findByIdAndDelete(campaignId);
      return "Campaign deleted"
   } catch (error) {
      throw new Error('Error deleting campaign: ' + error.message);
   }
}