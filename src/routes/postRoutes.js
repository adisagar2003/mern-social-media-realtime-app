const express =require('express');
const checkAdmin = require('../middlewares/checkAdmin');
const { createPost, getPosts, likePost, getPostById } = require('../controllers/postController');
const router  = express.Router();
const multer  = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '.jpg');
    }
    });
const upload = multer({storage});

router.get('/',getPosts);
router.post('/like',likePost);
router.get('/:id',getPostById);
router.post('/',checkAdmin,upload.single('image'),createPost);



module.exports =router;
