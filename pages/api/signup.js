import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
 if(req.method == 'POST'){
    console.log(req.body)
    const {name,email} = req.body
    var ciphertext = CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString();

  let u = new User({name ,email ,password:ciphertext})
  await u.save()
  
  res.status(200).json({success: "success"});
}
else{
    res.status(400).json({error:"not allowed"});
}

};
export default connectDb(handler);
