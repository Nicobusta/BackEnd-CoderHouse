import env from './src/utils/env.utils.js';
import express from 'express'
import { createServer } from "http";
import morgan from "morgan";
import IndexRouter from './src/routers/index.router.js'
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import {engine} from 'express-handlebars';
import socketUtils from "./src/utils/sockets.utils.js"

import compression from "express-compression";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import dbConnection from "./src/utils/db.js"
/* import router from './src/routers/index.router.js' */
//Simport sessionFileStore from "session-file-store";
/* import MongoStore from "connect-mongo"; */

import cors from "cors"
import wintson from './src/middlewares/winston.js';
import logger from './src/utils/logger/index.js';

//swagger
import swaggerOptions from "./src/utils/swagger.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";



//servers
const server=express()
const PORT=env.PORT ||8080
const ready = ()=>{
    logger.INFO(`Server ready on port ${PORT}`)
}

const httpServer=createServer(server)   
const socketServer=new Server(httpServer)
httpServer.listen(PORT,ready)
 

socketServer.on("connection", socketUtils)

//views
server.engine("handlebars",engine())
server.set("view engine","handlebars")
server.set("views",__dirname+"/src/views")



server.use(cookieParser(env.SECRET_KEY));
//MEMORY STORE
/* server.use(
  //sessions &cokies
const FileStore = sessionFileStore(expressSession);
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
); */

//FILE STORE
/* server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
      path: "./src/data/fs/files/sessions",
      ttl: 10,
      retries: 2,
    }),
  })
); */

//MONGO STORE
/* server.use(
  expressSession({
    secret: env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60, 
      mongoUrl: env.LINK_MONGO,
    }),
  })
); */

const specs = swaggerJSDoc(swaggerOptions);
server.use("/api/docs", serve, setup(specs)); 


server.use(cors({
    origin:true,
    credentials:true
}))

//middle
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(express.static(__dirname+"/public"))
server.use(morgan("dev")) 
server.use(wintson)
server.use(compression({
  brotli: { enabled:true, zlib:{} }
  }));
  

const router=new IndexRouter()
server.use("/",router.getRouter())
server.use(errorHandler)
server.use(pathHandler)

export {socketServer}