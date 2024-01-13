import { Router } from 'express';
/* import usersRouter from './users.view.js';
import productsRouter from './products.view.js'; */

const viewsRouter = Router();

viewsRouter.get('/', (req, res, next) => {
    try{
        return res.render("index",{})
    }catch(error){
        next(error)
    }
})        

viewsRouter.get('/real', (req, res, next) => {
    try{
        return res.render("real",{})
    }catch(error){
        next(error)
    }
}) 


viewsRouter.get('/form', (req, res, next) => {
    try{
        return res.render("form",{})
    }catch(error){
        next(error)
    }
})

viewsRouter.get('/register', (req, res, next) => {
    try{
        return res.render("register",{})
    }catch(error){
        next(error)
    }
})

/* viewsRouter.use('/users', usersRouter)
viewsRouter.use('/products', productsRouter) */

export default viewsRouter
