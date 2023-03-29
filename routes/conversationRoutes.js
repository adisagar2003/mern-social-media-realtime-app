const { getConversation, createConversation, addParticipantToGroup, getConversationsOfUser, getConversationWhereParticipants, getConversationById, getParticipantsOfConversation } = require('../controllers/conversationController');
const checkAdmin = require('../middlewares/checkAdmin');

const router = require('express').Router();

router.get('/',checkAdmin,getConversation);
router.post('/',checkAdmin,createConversation);
router.post('/add',addParticipantToGroup);
router.get('/creator',getConversationsOfUser);
router.get('/participants',getConversationWhereParticipants);
router.get('/:id',checkAdmin,getConversationById);
router.get("/:id/participants",checkAdmin,getParticipantsOfConversation)

module.exports = router;


