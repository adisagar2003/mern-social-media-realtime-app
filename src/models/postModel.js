const mongoose = require('mongoose');

const {Schema} = mongoose;

const postSchema = new Schema({
      creatorId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
      postHeading: {type:String},
      ownerName:{type: String},
      description:{type:String},
      imageSource:{type:String},
      createdAt:{type:Date, default:Date.now()},
      likes:[{type:mongoose.Schema.Types.ObjectId, ref:'User', default:[]}]
});

const postModel = new mongoose.model('Post', postSchema);

module.exports = postModel;

