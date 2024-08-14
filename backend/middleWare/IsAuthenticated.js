const jwt= require("jsonwebtoken");
const IsAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token)
        {
            return res.status(401).json({message:"User Not Authorized"})
        }

        const decodeToken = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decodeToken)
        {
            return res.status(401).json({message:"Invalid Token"})
        }
        req.id = decodeToken.userrID;
        next();

        
    } catch (error) {
        console.log("Error from is Authenticated",error);    
    }
}

module.exports = IsAuthenticated;