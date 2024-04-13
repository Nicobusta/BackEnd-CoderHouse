import { Types } from "mongoose";
import CustomError from "../../utils/errors/CustomError.js";
import errors from './../../utils/errors/errors.js';
/* import ManagerOrders from './../fs/orders.fs'; */


class MongoManager {
    constructor(model) {
        this.model = model;
    }
   
    async create(data) {
        try {
            const one = await this.model.create(data);
            return one._id;
          } catch (error) {
            throw error;
          }
       
     }
    async read({ filter, sortAndPaginate }) {
        try {
            const all = await this.model.paginate(filter,sortAndPaginate)
            return all;
          } catch (error) {
            throw error;
          }
       
     }
    async readOne(id) {
        try {
            const one = await this.model.findById(id);
            return one;
          } catch (error) {
            throw error;
          }
       
     }
    async update(id, data) {
        try {
            const opt= { new: true }
            const one = await this.model.findByIdAndUpdate(id, data, opt);
            return one;
          } catch (error) {
            throw error;
          }
       
     }
    async destroy(id) { 
        try {
            const one = await this.model.findByIdAndDelete(id);
            return one;
          } catch (error) {
            throw error;
          }
       
    }

    async readByEmail(email) {
      try {
          const one = await this.model.findOne(email);
          return one;
        } catch (error) {
          throw error;
        } 
     
   }

   async report(uid){
    try {
      const report = await this.model.aggregate([
        { $match: { uid: new Types.ObjectId(uid)} },

        { $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "pid",
          as: "product_id",
        }},

        { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"] }}},

        { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },

        { $group: { _id: "$uid", total: { $sum: "$subTotal" } } },

        { $project: { _id: 0, uid: "$_id", total: "$total", date: new Date() } }
      ]);
        

        return report;
      } catch (error) {
        throw error;
      }
   }

  
}

export default MongoManager;