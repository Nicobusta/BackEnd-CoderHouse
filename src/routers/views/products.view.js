import { Router } from "express";
import ManagerProduct from '../../data/fs/products.fs.js';

const productsRouter = Router()

productsRouter.get('/real', async(req, res, next) => {
    const all= await ManagerProduct.read()
    try{
        return res.render("real",{products:all})
    }catch(error){
        next(error)
    }
})
export default productsRouter