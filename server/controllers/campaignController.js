const campaignService = require('../services/campaignService');

const getMyCampaigns = async (req, res) =>{
   try {
      const userId = req.user._id; 
      const items = await campaignService.getMyCampaigns(userId);
      res.send(items);
   } catch (error) {
      const errMsg = error.message;
      res.send({ message: errMsg })
   }
};

module.exports = {
   getMyCampaigns,
}