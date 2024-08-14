const mongoose=require('mongoose');

const userModel = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    passWord:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    },
})

export const User = mongoose.model('User',userModel);