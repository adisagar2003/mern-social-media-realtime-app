const express =require('express');
const { createMessage, getMessage } = require('../controllers/messageController');
const checkAdmin = require('../middlewares/checkAdmin');
const router  = express.Router();

router.post('/',checkAdmin,createMessage);
router.get('/:id',checkAdmin,getMessage);


module.exports = router;
