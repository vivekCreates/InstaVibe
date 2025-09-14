import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
    console.log("token",token)
    if (!token) {
        return res.status(400).json({msg:"You dont have token"})
    }

    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
   if(!decoded){
    return res.status(400).json({msg:"You dont have decoded user"})
   }

   const loggedInUser = await User.findById(decoded._id)
   if(!loggedInUser){
    return res.status(400).json({msg:"can't get logged in user"})
   }

   req.user = loggedInUser;

   next()
  } catch (error) {
    console.log("Something went wrong while verifying jwt : ", error.message);
    next()
  }
};


export default verifyJWT