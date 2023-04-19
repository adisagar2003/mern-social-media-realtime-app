const express =require('express');
const checkAdmin = require('../middlewares/checkAdmin');
const { createPost, getPosts } = require('../controllers/postController');
const router  = express.Router();
const multer  = require('multer');

const upload = multer({dest:'uploads/'});

router.get('/',getPosts);
router.post('/',checkAdmin,upload.single('image'),createPost);



module.exports =router;
