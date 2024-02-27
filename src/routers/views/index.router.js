import { Router } from 'express';
import {ManagerProduct}  from '../../data/mongo/manager.mongo.js'
import productRouter from './products.view.js';
import sessionsRouter from './sessions.view.js';
import ordersRouter from './orders.view.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res, next) => {
    try{
        const sortAndPaginate = {
             sort: {price: 1},
             page: parseInt(req.query.page) || 1,
             limit: parseInt(req.query.limit) || 1
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
 
         return res.render("index",{
            products: products,
            next: readProducts.nextPage,
            prev: readProducts.prevPage,
            filter: req.query.title,})
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


viewsRouter.use("/sessions", sessionsRouter);
viewsRouter.use("/products", productRouter);
viewsRouter.use("/orders", ordersRouter);

export default viewsRouter
