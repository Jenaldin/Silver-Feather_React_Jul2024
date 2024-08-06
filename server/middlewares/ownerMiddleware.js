const campaignService = require('../services/campaignService');
const sessionService = require('../services/sessionService')

// exports.isCharacterOwner = async (req, res, next) => {
//    const characterId = req.params.campaignId
//    const character = await characterService.getOne({ _id: characterId });
//    if (!character) {
//       return res.status(404).send();
//    }
//    if (character.owner.toString() !== req.user?._id) {
//       return res.status(403).send({ error: 'Not authorized to access this character' });
//    };
//    req.character = character;
//    next();
// };

exports.isCampaignOwner = async (req, res, next) => {
   const campaignId = req.params.campaignId
   const campaign = await campaignService.getOne({ _id: campaignId });
   if (!campaign) {
      return res.status(404).send();
   }
   if (campaign.owner.toString() !== req.user?._id) {
      return res.status(403).send({ error: 'Not authorized to access this campaign' });
   };
   req.campaign = campaign;
   next();
};

exports.isSessionOwner = async (req, res, next) => {
   const sessionId = req.params.sessionId;
   const session = await sessionService.getOne({ _id: sessionId });
   if (!session) {
      return res.status(404).send();
   }
   if (session.owner.toString() !== req.user?._id) {
      return res.status(403).send({ error: 'Not authorized to access this session' });
   };
   req.session = session;
   next();
};

exports.isPostOwner = async (req, res, next) => {
   const postId = req.params.postId
   const post = await postService.getOne({ _id: postId });
   if (!post) {
      return res.status(404).send();
   }
   if (post.user.toString() !== req.user?._id) {
      return res.status(403).send({ error: 'Not authorized to access this post' });
   };
   req.post = post;
   next();
};

exports.isCommentOwner = async (req, res, next) => {
   const commentId = req.params.commentId
   const comment = await commentService.getOne({ _id: commentId });
   if (!comment) {
      return res.status(404).send();
   }
   if (comment.user.toString() !== req.user?._id) {
      return res.status(403).send({ error: 'Not authorized to access this comment' });
   };
   req.comment = comment;
   next();
};

// exports.isProfileOwner = async (req, res, next) => {
//    const userId = req.params.userId
//    const user = await authService.getOne({ _id: userId });
//    if (!user) {
//       return res.status(404).send();
//    }
//    if (user._id.toString() !== req.user?._id) {
//       return res.status(403).send({ error: 'Not authorized to access this profile' });
//    };
//    req.user = user;
//    next();
// };