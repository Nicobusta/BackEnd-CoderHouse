import "dotenv/config.js"
import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import {engine} from 'express-handlebars';
import dbConnection from "./src/utils/db.js"
import router from './src/routers/index.router.js'
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import socketUtils from "./src/utils/sockets.utils.js"

const server=express()
const PORT=8080
const ready = ()=>{
    dbConnection()
    console.log(`Server ready on port ${PORT}`)
}

const httpServer=createServer(server)   
const socketServer=new Server(httpServer)
httpServer.listen(PORT,ready)
 

socketServer.on("connection", socketUtils)


server.engine("handlebars",engine())
server.set("view engine","handlebars")
server.set("views",__dirname+"/src/views")


//middle
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(express.static(__dirname+"/public"))
server.use(morgan("dev")) 

server.use("/",router)
server.use(errorHandler)
server.use(pathHandler)

export {socketServer}