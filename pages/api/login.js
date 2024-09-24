import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const handler = async (req, res) => {
 if(req.method == 'POST'){
    console.log(req.body)
  let user = await  User.findOne({email: req.body.email})
  var bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
 
 
  if(user){
    if(req.body.email == user.email && req.body.password == originalText){
      var token = jwt.sign({ email: user.email, name: user.name}, process.env.JWT_SECRET);
         res.status(200).json({success:true,token, email:user.email});
    }
    else{
    res.status(400).json({ success:false , error:"Invalid Credentials"});
    }
  }
  else{
     res.status(400).json({ success:false , error:"No user found"});
  }

  
 
}


};
export default connectDb(handler);