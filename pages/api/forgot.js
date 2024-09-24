import Forgot from "@/models/Forgot";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";


const handler = async (req, res) => {
    if(req.method =="POST"){ 
   
          let token = `hhgfdjjkgjdjkjdjd`
    let fotgot = new Forgot({email:req.body.email, token:token})
    
   let email =  `We have sent you this email in response to your request to reset your password on Myecomsite. 
    <br/><br/>

    To reset your password  please follow the link below:

    <a href="http://localhost:3000/forgot?token=${token}">click here to reset password</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your ecomsite My Account Page and change user password....

    <br/><br/>`

    }
    
  
  
    res.status(200).json({ success:true });
  }

  export default connectDb(handler);