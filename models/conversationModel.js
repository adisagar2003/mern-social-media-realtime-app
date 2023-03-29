const mongoose = require('mongoose');

const {Schema} = mongoose;

const conversationSchema = new Schema({
    title:{type:String,required: true},
    creator: {type:mongoose.Schema.Types.ObjectId, ref:'User', unique:false},
    messages:[{type:mongoose.Schema.Types.ObjectId, ref:'Message', default:[]}],
    participants:[{type:mongoose.Schema.Types.ObjectId,ref:'User', default:[], unique:false}]
  

});

const conversationModel = new mongoose.model('Conversation', conversationSchema);

module.exports = conversationModel;

