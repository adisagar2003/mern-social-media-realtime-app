const express =require('express');
const checkAdmin = require('../middlewares/checkAdmin');
const { createPost, getPosts } = require('../controllers/postController');
const router  = express.Router();

router.post('/',checkAdmin,createPost);
router.get('/',getPosts);


module.exports =router;
