const jwt = require('jsonwebtoken');

function checkCurrentAndHeader(req,res){
    var currentUser = req?.headers?.authorization;

    if (currentUser){
        var token = current.split(' ')[1];

       var targetToken = jwt.verify(token,'123',function(err,decoded){
            if (req.body.creator == targetToken.userName){
                return true
            }
            else{
                return false
            }
       })
    }
}

module.exports = checkCurrentAndHeader;