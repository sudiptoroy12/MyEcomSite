const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default:''},
    district: { type: String, default:''},
    thana: { type: String, default:''},
    phone: { type: String, default:''},
    gender: { type: String, default:''},
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("User", UserSchema);
