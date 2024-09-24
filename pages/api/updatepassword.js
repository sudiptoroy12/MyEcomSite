import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
if(req.method =="POST"){ 
  const token = req.body.token
  var decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  let users= await User.findOne({email:decodedUser.email })
  var bytes  = CryptoJS.AES.decrypt(users.password, process.env.AES_SECRET);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  if(originalText == req.body.password && req.body.npassword == req.body.cpassword ){
   let users= await User.findOneAndUpdate({email :decodedUser.email },{password:CryptoJS.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString()} )
  
  res.status(200).json({success:true});
}
res.status(200).json({ success:false , error:"Invalid Password"});
    
}
else{
  res.status(400).json({error:"error"});
}

}

export default connectDb(handler);
