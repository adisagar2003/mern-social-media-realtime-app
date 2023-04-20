const postModel = require("../models/postModel")
const jwt = require('jsonwebtoken');
var path = require('path')
module.exports={
    getPosts:async (req,res)=>{

        const posts = await postModel.find(req.params);
        res.status(400).json({
            data: posts,
            response:'success'
        });

    },
    createPost:async (req,res)=>{
        const token = req.headers.authorization.split(' ')[1];
        console.log(req.file);
        var fullUrl = req.protocol + '://' + req.get('host');
        console.log(`${fullUrl}/${req.file.path}`);
        const decoded = jwt.verify(token,'123',function(err,decoded){
            if (err){
                throw new Error(err);
    
            }else{
                return decoded.userName;
            }});
        const fileUploaded = req.file
        const fileUploadedExtension = fileUploaded.originalname.split('.')[1];
        console.log(fileUploadedExtension);
       
        const postData ={
            postHeading: req.body.postHeading,
            ownerName: req.body.ownerName,
            description:req.body.description,
            imageSource:`${fullUrl}/${req.file.path}`,
            creatorId: decoded
        }
        const post = new postModel(postData);
        await post.save();
        res.status(200).json({
            resposne:'success',
            data: post
        })
    },
    deletePost:async (req,res)=>{  
        
    },
    likePost:async (req,res)=>{
        const token = req.headers.authorization.split(' ')[1];
        var postId = req.body.postId;
        var post = await postModel.findById(postId);
        console.log(post);
        const decoded = jwt.verify(token,'123',function(err,decoded){
            if (err){
                throw new Error(err);
    
            }else{
                return decoded.userName;
            }});
        if (post.likes.indexOf(decoded)!=-1){

        }else{
            post.likes= [...post.likes,decoded]
        }
        await  post.save();
        res.json({
            resposne:'success',
            data:post
        });
    }
}