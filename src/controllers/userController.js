const userModel = require("../models/userModel");
const { decoded } = require("../utils/decodedUser");
const jwt =require("jsonwebtoken");
module.exports = {
    followUser: async (req,res) => {

        try{
            let token= req.headers.authorization.split(' ')[1];
            let targetUser = await userModel.findById(req.body.targetUser);
            const decoded = jwt.verify(token,'123',function(err,decoded){
                if (err){
                    throw new Error(err);
        
                }else{
                    return decoded.userName;
                }});
        
            // Add to user's following
            let currentUser = await  userModel.findById(decoded);
            if (currentUser.following.indexOf(targetUser._id)==-1){
                currentUser.following = [targetUser._id,...currentUser.following];
            }
            await currentUser.save();

            // Add to user's followers 
            if (targetUser.followers.indexOf(decoded)==-1){
                targetUser.followers = [decoded, ...targetUser.followers];
            }
            await targetUser.save();
            
        res.json({
            currentUser:currentUser,
            targetUser: targetUser
        });
        }catch(err){
            res.json({
                error: err.message
            })
        }
        
    },
    unfollowUser: async (req,res) => {
        try{
            let token= req.headers.authorization.split(' ')[1];
            let targetUser = await userModel.findById(req.body.targetUser);
            const decoded = jwt.verify(token,'123',function(err,decoded){
                if (err){
                    throw new Error(err);
        
                }else{
                    return decoded.userName;
                }});
        
            // Remove from user's following
            let currentUser = await  userModel.findById(decoded);
        if (currentUser.following.indexOf(targetUser._id)!=-1){
                currentUser.following.splice(targetUser.followers.indexOf(targetUser._id),1);
            }
            await currentUser.save();

            // Remove from  user's followers 
            if (targetUser.followers.indexOf(decoded)!=-1){
                targetUser.followers.splice(targetUser.followers.indexOf(decoded),1);
            }
            await targetUser.save();
            
        res.json({
            currentUser:currentUser,
            targetUser: targetUser
        });
        }catch(err){
            res.json({
                error: err.message
            })
        }
    }
}