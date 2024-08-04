const mongoose = require('mongoose');
const { sessionModel, campaignModel } = require('../models/index');

exports.getOne = async (sessionId) => await sessionModel.findOne(sessionId)

exports.getAllSessions = async (campaignId) => {
   try {
      const sessions = await sessionModel.find({ campaign: campaignId });
      sessions.sort((a, b) => b.createdAt - a.createdAt);
      return sessions;
   } catch (error) {
      throw new Error('Error fetching sessions: ' + error.message);
   }
};

exports.getSession = async (sessionId) => {
   try {
      const session = await sessionModel.findById(sessionId).populate('owner', 'username');
      return session
   } catch (error) {
      throw new Error('Error fetching requested session: ' + error.message);
   }
};

exports.addSession = async (payload, ownerId, campaignId) => {
   try {
      const createdSession = await sessionModel.create({
         ...payload,
         owner: ownerId,
      });

      await campaignModel.findByIdAndUpdate(campaignId, { $push: { sessions: createdSession._id } });

      return createdSession;
   } catch (error) {
      throw new Error('Error creating session: ' + error.message);
   }
};

exports.editSession = async (sessionId, payload) => {
   try {
      const updatedSession = await sessionModel.findByIdAndUpdate(sessionId, payload, { runValidators: true });
      return updatedSession;
   } catch (error) {
      throw new Error('Error updating session: ' + error.message);
   }
};

exports.deleteSession = async (sessionId) => {
   try {
      await sessionModel.findByIdAndDelete(sessionId);
      return "Session deleted"
   } catch (error) {
      throw new Error('Error deleting session: ' + error.message);
   }
}