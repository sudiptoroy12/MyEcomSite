const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    orderId: {type:String, required: true},
    products:{ type:Object , required: true },
    address: { type: String, required: true },
    district: { type: String, required: true  },
    thana: { type: String, required: true },
    amount: { type: Number, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    status: { type: String, default: "pending", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
