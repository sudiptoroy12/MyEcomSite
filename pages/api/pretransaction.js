import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";


const handler = async (req, res) => {
 if(req.method == 'POST'){
 
  if(req.body.subTotal <= 0){
    console.log(typeof req.body.subTotal )
    res.status(200).json({success:false , "error": "Plese enter a cart!!!!"});
    return
  }
  

  let o = new Order({email:req.body.email, orderId: req.body.oid, address:req.body.address,district:req.body.district,thana:req.body.thana, amount:req.body.subTotal,phone:req.body.phone, status:req.body.status, products: req.body.cart, gender: req.body.gender })
  await o.save()
  
  res.status(200).json({success: "success"});
}
else{
    res.status(400).json({error:"error"});
}

};
export default connectDb(handler);
