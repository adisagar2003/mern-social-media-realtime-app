const jwt = require('jsonwebtoken');

function checkAdmin(req,res,next){

    try{
      //get the header
      const token = req.headers['authorization'].split(' ')[1];
      //decode jwt
   jwt.verify(token, '123', function(err,decoded){
    //err
    if (err){
        throw new Error('No verified token');
    }else{
        if (decoded){
            next();
        }
    }
   })
      // if jwt admin, next else throw
    }
    catch(err){
        res.status(400).json({
            error:err.message
        });
    }
}

module.exports = checkAdmin;