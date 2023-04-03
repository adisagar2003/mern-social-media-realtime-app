const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    login: async function(req,res){
        console.log('starting login... request')
        try{
            if (req.body.email=='' || req.body.password==''){
                throw new Error("Empty Credentials found")
            }
            const targetUser =await userModel.findOne({email:req.body.email});
            if (targetUser){    
                bcrypt.compare(req.body.password, targetUser.password, function(err,result){
                    console.log(result);
                    if (result){
                        const token =   jwt.sign({userName:targetUser.id, role: targetUser.role}, '123');
                        res.set('Authorization',`Bearer ${token}`);
                        res.status(220).json({
                            response:'success',
                            token: token,
                            userData:{
                                "role": targetUser.role,
                                "_id": targetUser.id,
                                "firstName": targetUser.firstName,
                                "lastName": targetUser.lastName,
                                "userName": targetUser.userName,
                                "email": targetUser.email,
                                "created_at": targetUser.created_at,
                                "avatar": targetUser.avatar

                            }
                        });
                    }
                    else
                    {
                       res.status(400).json({
                        error:'The password was incorrect'
                       })
                    }
                })
            }else{
                throw new Error('The email you entered doesn\'t exist ')
            }
            
        }catch(err){
            res.status(400).json({
                error:err.message

            })
        }
    }
}