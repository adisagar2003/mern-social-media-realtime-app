const getCurrentUser = require("../utils/getCurrentUser")
const jwt = require('jsonwebtoken');
const messageModel = require("../models/messageModel");
module.exports = {
    createMessage: async function(req,res){
        try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,'123',function(err,decoded){
            if (err){
                throw new Error(err);
    
            }else{
                return decoded.userName;
            }});
        console.log(decoded);
        const messageData = {
            senderId: decoded,
            conversationId:req.body.conversationId,
            content:req.body.content,
        }

        const message =new messageModel(messageData);
        const resultMessage = await message.save();
        res.status(220).json({
            data: resultMessage,
            response:'success'
        });

        
        

    }catch(err){

        res.status(400).json({
            error: err.message
        })
    } 
    },
    getMessage:async (req,res)=>{
        try{
            const messages = await messageModel.find({conversationId:req.params.id}).populate('senderId');
            res.status(200).json({
                data: messages,
                response:'success'
            });

        }catch(err){
            res.status(400).json({
                error:err.message,

            })
        }
    }
}