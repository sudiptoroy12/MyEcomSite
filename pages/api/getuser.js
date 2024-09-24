import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";


const handler = async (req, res) => {
  if(req.method =="POST"){ 
  const token = req.body.token
  var decodedUser = jwt.verify(token, process.env.JWT_SECRET);

   let users= await User.findOne({email:decodedUser.email })
   const {name,email,address,district,thana,phone,gender} = users


  
  res.status(200).json({name,email,address,district,thana,phone,gender});
}
else{
  res.status(400).json({error:"error"});
}

}



export default connectDb(handler);
