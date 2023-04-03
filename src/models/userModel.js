const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');




  
const userSchema = new Schema({
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  userName: {
    type:String,unique:true
  },
  role:{type: String, default: 'normal'},
  password: { type: String },
  confirmPassword:{type:String},
  email:{type:String},
  created_at: { type: Date, default: Date.now },
  conversations:[{type:mongoose.Schema.Types.ObjectId, default:[], ref:'Conversation',unique:false}],
  avatar:{type:String}
});
module.exports = mongoose.model('User',userSchema);