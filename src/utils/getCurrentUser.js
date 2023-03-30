const jwt = require('jsonwebtoken');

module.exports = function getCurrentUser(req,res){
    try{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token,'123',function(err,decoded){
        if (err){
            throw new Error(err);

        }else{
            return decoded.userName;
        }
    });
    

    }catch(err){
        throw new Error(err.message);
    }
}