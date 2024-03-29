import CustomRouter from "../CustomRouter.js";
import propsProducts from "../../middlewares/propsProducts.js";
import isAdmin from "../../middlewares/isAdmin.js";
import passCb from "../../middlewares/passCb.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controlers/productControler.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.post(
      "/",
      ["ADMIN", "PREM"],
      passCb("jwt"),
      isAdmin,
      propsProducts,
      create
    );
    

    this.get("/", ["PUBLIC"], read);

    this.get("/:pid", ["PUBLIC"], readOne);

    this.put("/:pid", ["ADMIN", "PREM"], update);

    this.delete("/:pid", ["ADMIN", "PREM"], destroy);
  }
}

export default ProductsRouter;
