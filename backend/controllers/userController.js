const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const register = async (req,res)=>{

    try{
        const {fullName,userName,password,confirmPassword, gender,profilePhoto} = req.body;
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
                profilePhoto:gender === male ? maleProfile : femaleProfile,
                gender
        });
    }

}
    catch(err){
        console.log(err);
    }
}

module.exports = {register};
