import CustomRouter from "../CustomRouter.js";
import { checkoutController } from "../../controllers/paymentControler.js";

class PaymentsRouter extends CustomRouter {
    init() {
      this.post(
        "/checkout",
        ["ADMIN","USER", "PREM"],
        checkoutController
      );
    }  
}

export default PaymentsRouter