import {ManagerProduct} from './../data/mongo/manager.mongo.js';


class ProductService{
    constructor(){
        this.model=ManagerProduct
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

    update=async (id,data)=>{
        try {
            const response= await this.model.update(id,data);
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

const productService = new ProductService()
export default productService