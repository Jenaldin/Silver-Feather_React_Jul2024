const sessionService = require('../services/sessionService');

const getSessions = async (req, res) =>{
   try {
      const campaignId = req.params.campaignId; 
      const items = await sessionService.getAllSessions(campaignId);
      res.send(items);
   } catch (error) {
      const errMsg = error.message;
      res.send({ message: errMsg })
   }
};

const getSessionDetails = async (req, res) => {
   try {
      const item = await sessionService.getSession(req.params.sessionId);
      res.send(item);
   } catch (error) {
      const errMsg = error.message;
      res.send({ message: errMsg })
   }
};

const createSession = async (req, res) => {
   const payload = req.body;
   const campaignId = "";
   const ownerId = req.user._id;
   try {
      await sessionService.addSession(payload, ownerId, campaignId);
      res.json({ message: 'Session added successfully' });
   } catch (error) {
      const errMsg = error.message;
      res.send({ message: errMsg })
   }
};

const editSession = async (req, res) => {
   const { sessionId } = req.params;
   const payload = req.body;
   try { 
      await sessionService.editSession(sessionId, payload);
      res.json({ message: 'Session updated successfully' });
   } catch (error) {
      const errMsg = error.message;
      res.send({ message: errMsg })
   }
};

const deleteSession = async (req, res) => {
   const { sessionId } = req.params;
   try {
      await sessionService.deleteSession(sessionId);
      res.json({ message: 'Session deleted successfully' });
   } catch (error) {
      const errMsg = error.message;
      res.send({ message: errMsg })
   }
};

module.exports = {
   getSessions,
   getSessionDetails,
   createSession,
   editSession,
   deleteSession,
}