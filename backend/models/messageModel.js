const mongoose= require('mongoose');
const messageMode = new mongoose.Schema({
    senderID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    receiverID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    message:{
        type:String,
    },
    file:{
        type:String
    }
},{timestamps:true})

const Message = mongoose.model('Message',messageMode);
module.exports = {Message};