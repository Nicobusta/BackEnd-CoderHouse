import Product from "./models/products.models.js";
import User from "./models/users.models.js";
import Order from "./models/orders.models.js";

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
    async read(obj) {
        try {
            let { filter, order} = obj;
            const all = await this.model.find(filter).sort(order);
            if(all.length === 0){
                const error= new Error("there aren't elements")
                error.statusCode=404
                throw error
            }
            return all;
          } catch (error) {
            throw error;
          }
       
     }
    async readOne(id) {
        try {
            const one = await this.model.findById(id);
            if(!one){
                const error= new Error("there isn't elements")
                error.statusCode=404
                throw error
            }
            return one;
          } catch (error) {
            throw error;
          }
       
     }
    async update(id, data) {
        try {
            const opt= { new: true }
            const one = await this.model.findByIdAndUpdate(id, data, opt);
            if(!one){
                const error= new Error("there isn't elements")
                error.statusCode=404
                throw error
            }
            return one;
          } catch (error) {
            throw error;
          }
       
     }
    async destroy(id) { 
        try {
            const one = await this.model.findByIdAndDelete(id);
            if(!one){
                const error= new Error("there isn't elements")
                error.statusCode=404
                throw error
            }
            return one;
          } catch (error) {
            throw error;
          }
       
    }

    async readByEmail(filter) {
      try {
          const one = await this.model.find(filter);
          if(!one){
              const error= new Error("there isn't elements")
              error.statusCode=404
              throw error
          }
          return one;
        } catch (error) {
          throw error;
        } 
     
   }

  
}

const ManagerUser = new MongoManager(User);
const ManagerOrders = new MongoManager(Order);
const ManagerProduct = new MongoManager(Product);
export {ManagerProduct, ManagerUser, ManagerOrders} 