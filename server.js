import express from 'express'
import ManagerProduct from './data/fs/products.fs.js'
import ManagerUser from './data/fs/user.fs.js'

const server=express()
const PORT=8080
const ready = ()=>{
    console.log(`Server ready on port ${PORT}`)
}

//middle
server.use(express.urlencoded({extended:true}))

server.listen(PORT,ready)

server.get ('/api/products',(req,res)=>{
    try {
        const products = ManagerProduct.read()
        if(products){
            return res.status(200).json({
                success:true,
                response: products
            })
        }else{
            return res.status(404).json({
                success:false,
                message: "Not found!"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
        
    }
    
})

server.get ('/api/products/:pid',(req,res)=>{
    try {
        const {pid} = req.params
        const product = ManagerProduct.readOne(pid)
        if(product){
            return res.status(200).json({
                success:true,
                response: product
            })
        }else{
            return res.status(404).json({
                success:false,
                message: "Not found!"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
        
    }
    
})

server.get ('/api/users',(req,res)=>{
    try {
        const users = ManagerUser.read()
        if(users){
            return res.status(200).json({
                success:true,
                response: users
            })
        }else{
            return res.status(404).json({
                success:false,
                message: "Not found!"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
        
    }
    
})

server.get ('/api/users/:uid',(req,res)=>{
    try {
        const {uid} = req.params
        console.log(uid);
        const user = ManagerUser.readOne(uid)
        
        if(user){
            return res.status(200).json({
                success:true,
                response: user
            })
        }else{
            return res.status(404).json({
                success:false,
                message: "Not found!"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
        
    }
    
})