import argsUtil from "../utils/args.util.js";
import  crypto from 'crypto';

class UsersDto {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id =crypto.randomBytes(12).toString("hex"))
        this.name= data.name,
        this.photo= data.photo || "https://cdn-icons-png.flaticon.com/512/74/74472.png",
        this.email= data.email,
        this.verified = data.verified || false,
        this.verifiedCode = crypto.randomBytes(12).toString("base64"),
        argsUtil.env !== "prod" && (this.updatedAt = new Date()),
        argsUtil.env !== "prod" && (this.createdAt = new Date())
    }
}

export default UsersDto