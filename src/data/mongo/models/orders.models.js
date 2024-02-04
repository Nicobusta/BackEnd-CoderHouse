import { model, Schema, Types } from "mongoose";

let collection = "orders";

const schema = new Schema({
  pid: { type: Types.ObjectId, ref: "products", type: String, required: true },
  uid: { type: Types.ObjectId, ref: "users", type: String, required: true },
  quantity: { type: Number, required: true },
  state: { type: Number, required: true },
  
},{timestamps:true});

const Order = model(collection, schema);
export default Order;