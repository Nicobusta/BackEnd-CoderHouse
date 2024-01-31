import { model, Schema } from "mongoose";

let collection = "products";

const schema = new Schema({
  title: { type: String, required: true },
  photo: { type: String, default: "https://shopnguyenlieumypham.com/wp-content/uploads/no-image/product-456x456.jpg" },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  
},{timestamps:true});

const Product = model(collection, schema);
export default Product;
