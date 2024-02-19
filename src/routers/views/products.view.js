import { Router } from "express";
//import {ManagerProduct}  from '../../data/mongo/manager.mongo.js'

const productRouter = Router();

productRouter.get('/form', (req, res, next) => {
    try{
        return res.render("form",{})
    }catch(error){
        next(error)
    }
})

export default productRouter;