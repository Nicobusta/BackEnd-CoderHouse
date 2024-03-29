import argsUtil from "../utils/args.util.js";
import  crypto from 'crypto';

class ProductsDto {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id =crypto.randomBytes(12).toString("hex"))
        this.title= data.title,
        this.photo= data.photo || "https://shopnguyenlieumypham.com/wp-content/uploads/no-image/product-456x456.jpg",
        this.price= data.price,
        this.stock= data.stock
        argsUtil.env !== "prod" && (this.updatedAt = new Date())
        argsUtil.env !== "prod" && (this.createdAt = new Date())
    }
}

export default ProductsDto