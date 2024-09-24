import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";


const handler = async (req, res) => {
if(req.method =="POST"){ 
  const token = req.body.token
  var decodedUser = jwt.verify(token, process.env.JWT_SECRET);

   let users= await User.findOneAndUpdate({email :decodedUser.email },{name:req.body.name, address: req.body.address, phone: req.body.phone , district:req.body.district , thana:req.body.thana, gender:req.body.gender} )
  
  res.status(200).json({success:true});
}
else{
  res.status(400).json({error:"error"});
}

}

export default connectDb(handler);
