import Stripe from "stripe"
import env from "../utils/env.utils.js";
import dao from "../data/factory.js"

const {orders}=dao

const stripe = new Stripe(env.STRIPE_KEY)
class PaymentRep {
    constructor() {
        this.model = orders
    }

    checkoutRepository=async (filter)=>{
        try {
            const cart = await this.model.readOne(filter)
            console.log(cart);
            const line_items=[
            /*     {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:"paralacutinga"
                    },
                    unit_amount: 1000
                }
            } */
        ]
            const mode = "payment"
            const success_url = "http://localhost:8080/Thanks.html"
            const intent= await stripe.checkout.sessions.create({
                line_items, mode, success_url})
            return intent
        } catch (error) {
            throw error
        }
    }
}
const repository = new PaymentRep();
export default repository;