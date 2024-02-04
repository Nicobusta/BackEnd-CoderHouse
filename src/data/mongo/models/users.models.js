import { model, Schema } from "mongoose";

let collection = "users";

const schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true, default:"https://cdn-icons-png.flaticon.com/512/74/74472.png" },
  email: { type: String, required: true, unique: true },
  
},{timestamps:true});

const User = model(collection, schema);
export default User;
