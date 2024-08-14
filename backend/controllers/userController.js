const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jw = require('jsonwebtoken');
const register = async (req,res)=>{

    try{
        const {fullName,userName,password,confirmPassword, gender} = req.body;
        if(!fullName || !userName || !password || !confirmPassword ||!gender)
        {
            return res.status(400).json({message:"Please fill all the fields"});
        }
        if( password !== confirmPassword)
        {
            return res.status(400).json({message:"Password does not match"});
        }

        const user = await User.findOne({userName});

        if(user)
        {
            return res.status(400).json({message:"User already exists"});
        }
        else{
            const hashPassword = await bcrypt.hash(password,10); 
            const maleProfile= `https://avatar.iran.liara.run/public/boy?username=${userName}`;
            const femaleProfile= `https://avatar.iran.liara.run/public/girl?username=${userName}`;

            await User.create({
                fullName,
                userName,
                password:hashPassword,
                profilePhoto:gender === "male" ? maleProfile : femaleProfile,
                gender
        });

        return res.status(201).json({message:"User registered successfully"});
    }

}
    catch(err){
        console.log(err);
    }
}
const login = async (req,res)=>{
    try{

        const {userName,password} = req.body;
        if(!userName || !password)
        {
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const user = await User.findOne({userName});
        if(!user)
        {
            return res.status(400).json({message:"User does not exist"});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password); 
        if(!isPasswordMatch)
        {
            return res.status(400).json({message:"Incorrect Password"});
        }

        const tokenData={
            userrID:user._id,
        }

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:"1h"});

    }
    catch(err)
    {
        console.log(err)
    }
};

module.exports = {register};
