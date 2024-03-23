import {ManagerOrders} from './../data/mongo/manager.mongo.js';


class OrderService{
    constructor(){
        this.model=ManagerOrders
    }

    create=async (data)=>{
        try {
         const response= await this.model.create(data);
         return response
        } catch (error) {
         throw error
        }
     }
 
     read=async ({filter,sortAndPaginate})=>{
         try {
             const response= await this.model.read({filter,sortAndPaginate});
             return response
         } catch (error) {
             throw error
         }
     }
 
     readOne=async (id)=>{
         try {
             const response= await this.model.readOne(id);
             return response
         } catch (error) {
             throw error
         }
     }

     report=async (id)=>{
         try {
             const response= await this.model.report(id);
             return response
         } catch (error) {
             throw error
         }
     }
 
     update=async (id,quantity,state)=>{
         try {
             const response= await this.model.update(id,quantity,state);
             return response
         } catch (error) {
             throw error
         }
     }
 
     destroy=async (id)=>{
         try {
             const response= await this.model.destroy(id);
             return response
         } catch (error) {
             throw error
         }
     }
}

const orderService = new OrderService()
export default orderService