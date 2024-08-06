const campaignService = require('../services/campaignService');

const getMyCampaigns = async (req, res) =>{
   try {
      const userId = req.params.userId; 
      const items = await campaignService.getMyCampaigns(userId);
      res.send(items);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const getCampaign = async (req, res) => {
   try {
      const item = await campaignService.getOneCampaign(req.params.campaignId);
      res.send(item);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const createCampaign = async (req, res) => {
   const payload = req.body;
   const ownerId = req.user._id;
   try {
      await campaignService.addNew(payload, ownerId);
      res.json({ message: 'Campaign added successfully' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const editCampaign = async (req, res) => {
   const { campaignId } = req.params;
   const payload = req.body;
   try { 
      await campaignService.editCurrent(campaignId, payload);
      res.json({ message: 'Campaign updated successfully' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const deleteCampaign = async (req, res) => {
   const { campaignId } = req.params;
   try {
      await campaignService.deleteCurrent(campaignId);
      res.json({ message: 'Campaign deleted successfully' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

module.exports = {
   getMyCampaigns,
   getCampaign,
   createCampaign,
   editCampaign,
   deleteCampaign,
}