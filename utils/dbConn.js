const mongoose = require('mongoose');
require("dotenv").config();
function connectDb(){
mongoose.connect(process.env.MONGODB_URI).then(result=>{
 console.log('database connected');   
})

}

module.exports = connectDb;
