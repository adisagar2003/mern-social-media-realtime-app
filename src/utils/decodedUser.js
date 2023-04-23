 
const jwt = require("jsonwebtoken"); 
const decoded = (token)=>{ 
    
    jwt.verify(token,'123',function(err,decoded){
    if (err){
        throw new Error(err);

    }else{
        return decoded.userName;
    }});}


    module.exports =decoded;