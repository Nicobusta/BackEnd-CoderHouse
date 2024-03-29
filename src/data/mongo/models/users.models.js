import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import crypto from "crypto";

let collection = "users";

const schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, default:"https://cdn-icons-png.flaticon.com/512/74/74472.png" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: Number, default: 1 , enum:[0,1,2]},
  verified: { type: Boolean, default: false },
  verifiedCode: { type: String, default:crypto.randomBytes(12).toString("base64")}
  
},{timestamps:true});

schema.plugin(mongoosePaginate)
const User = model(collection, schema);
export default User;
