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
        required:true
    }
})

export const Message = mongoose.model('Message',messageMode);