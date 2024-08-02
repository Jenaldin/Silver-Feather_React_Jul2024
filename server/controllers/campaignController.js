const campaignService = require('../services/campaignService');

const getMyCampaigns = async (req, res) =>{
   try {
      const userId = req.params.userId; 
      const items = await campaignService.getMyCampaigns(userId);
      res.send(items);
   } catch (error) {
      const errMsg = error.message;
      res.send({ message: errMsg })
   }
};

const getCampaign = async (req, res) => {
   try {
      const item = await campaignService.getOneCampaign(req.params.campaignId);
      res.send(item);
   } catch (error) {
      const errMsg = error.message;
      res.send({ message: errMsg })
   }
};

const createCampaign = async (req, res) => {
   const payload = req.body;
   const ownerId = req.user._id;
   try {
      await campaignService.addNew(payload, ownerId);
      res.json({ message: 'Campaign added successfully' });
   } catch (error) {
      const errMsg = error.message;
      res.send({ message: errMsg })
   }
};

const deleteCampaign = async (req, res) => {
   const { campaignId } = req.params;
   try {
      await campaignService.deleteCurrent(campaignId);
      res.json({ message: 'Campaign deleted successfully' });
   } catch (error) {
      const errMsg = error.message;
      res.send({ message: errMsg })
   }
};

module.exports = {
   getMyCampaigns,
   getCampaign,
   createCampaign,
   deleteCampaign,
}