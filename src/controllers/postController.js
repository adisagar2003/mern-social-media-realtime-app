const postModel = require("../models/postModel")
const jwt = require('jsonwebtoken');
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
        const decoded = jwt.verify(token,'123',function(err,decoded){
            if (err){
                throw new Error(err);
    
            }else{
                return decoded.userName;
            }});
        const postData ={
      postHeading: req.body.postHeading,
      ownerName: req.body.ownerName,
    description:req.body.description,
      imageSource:req.body.imageSource,
      creatorId: decoded
        }
        const post = new postModel(postData);
        await post.save();
        res.status(200).json({
            resposne:'success',
            data: post
        })
    }
}