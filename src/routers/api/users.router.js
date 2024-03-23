import CustomRouter from "../CustomRouter.js";
//import ManagerUser  from "../../data/fs/user.fs.js"
import {ManagerUser}  from "../../data/mongo/manager.mongo.js"
import propsUser from "../../middlewares/propsUser.js";
import {create, read, readByEmail, readOne, update, destroy} from "../../controllers/userControler.js";


class UsersRouter extends CustomRouter {
    init() {
        this.post("/", ["PUBLIC"], propsUser, create);
        
          this.get ('/', ["ADMIN", "PREM"], read)
        
        this.get("/:email", ["PUBLIC"], readByEmail);
        
        this.get ('/:uid', ["USER","ADMIN", "PREM"], readOne)
        
        this.put('/:uid', ["USER","ADMIN", "PREM"],update)
        
        this.delete('/:uid', ["USER","ADMIN", "PREM"], destroy)
        
    }
}


export default UsersRouter