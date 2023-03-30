const mongoose = require('mongoose');

const {Schema} = mongoose;

const messageSchema = new Schema({
      senderId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
      conversationId: {type:mongoose.Schema.Types.ObjectId, ref:'Conversation', required: true},
      content: {type:String},
      createdAt:{type:Date, default:Date.now()}
});

const messageModel = new mongoose.model('Message', messageSchema);

module.exports = messageModel;

