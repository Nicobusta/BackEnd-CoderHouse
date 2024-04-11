import { connect } from "mongoose"
import env from './env.utils.js';
const dbConnection = async () => {
 try {
   await connect(env.LINK_MONGO)
   console.log("database connected");
 } catch (error) {
   console.log(error);
 } 
}

export default dbConnection