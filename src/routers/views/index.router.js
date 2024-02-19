import { Router } from 'express';
import {ManagerProduct}  from '../../data/mongo/manager.mongo.js'
import productRouter from './products.view.js';
import sessionsRouter from './sessions.view.js';

const viewsRouter = Router();

viewsRouter.get('/', (req, res, next) => {
    try{
        return res.render("index",{})
    }catch(error){
        next(error)
    }
})        

viewsRouter.get('/real', async (req, res, next) => {
    try{
       const sortAndPaginate = {
            sort: {price: 1},
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        }

        const filter = {}
        if(req.query.title){
            filter.title = new RegExp(req.query.title.trim(), "i");
        }

        if (req.query.price === "desc") {
            sortAndPaginate.sort.price = -1;
        } 
        const readProducts = await ManagerProduct.read({filter,sortAndPaginate})
        let products = readProducts.docs.map(doc => doc.toObject())

        return res.render("real",{products: products})
    }catch(error){
        next(error)
    }
}) 


viewsRouter.use("/auth", sessionsRouter);
viewsRouter.use("/products", productRouter);

export default viewsRouter
