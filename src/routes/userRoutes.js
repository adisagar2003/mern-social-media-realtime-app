const express= require('express');
const router= express.Router();
const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const checkAdmin= require('../middlewares/checkAdmin');
const { followUser, unfollowUser } = require('../controllers/userController.js');


//All users [ADMIN ONLY!]
router.get('/',checkAdmin,async (req,res)=>{
    try{
        const data =await User.find(req.params);
        res.status(200).json({
            data: data,
            response:'success'
        });
    }catch(err){
        res.status(400).json({
            error:'error',
            message: err.message
        })
    }
})



router.post('/follow', followUser);
router.post('/unfollow',unfollowUser);

//Registration Of User
router.post('/register',async (req,res)=>{
    try{
    if (req.body.confirmPassword != req.body.password || !req.body.password || !req.body.confirmPassword){
throw new Error('Password and Confirm Password don\'t match');
    }

    

    const userData = {
        email:req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        confirmPassword:req.body.confirmPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }


    
    bcrypt.hash(req.body.password,12).then((hashedPassword)=>{

        userData.password = hashedPassword;
        userData.confirmPassword = hashedPassword;
        var user = new User(userData);
        const resultUser = user.save().then((user)=>{
        const jsonwebtokendata = jwt.sign({userName:userData.id, role: userData.role}, process.env.SECRET);
        res.set('Authorization',`Bearer ${jsonwebtokendata}`);

    res.status(200).json({
        user: user,
        response:'success',
        token: jsonwebtokendata
        
    });
        });
    })

   
     
}
    catch(err){
        res.status(400).json({
            response:err.message,
            error:err.message
        })
    }

})


module.exports = router;

