import orderService from "../services/orderService.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

class OrderControler{
    constructor(){
        this.service=orderService
    }

    create= async (req,res, next)=>{
        try {
            const data = req.body;
            const response = await  this.service.create(data);
            if(response){
                return res.success201(response);
            }
            CustomError.new(errors.notFound);
        } catch (error) {
            return next(error);
        }
    }

    read= async (req,res, next)=>{
        try {
            const sortAndPaginate = {
                sort: {state: 1},
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10
            }
    
            const filter = {}
            if(req.query.uid){
                filter.uid = req.query.uid
            }
    
            if (req.query.state === "desc") {
                sortAndPaginate.sort.state = -1;
            }
    
            const orders = await this.service.read({filter,sortAndPaginate})
            if(orders){
                return res.success200(orders)
            }else{
                CustomError.new(errors.notFound);
            }
            
        } catch (error) {
            return next(error);   
        } 
    }

    readOne= async (req,res, next)=>{
        try {
            const {uid} = req.params
            const order =await this.service.readOne(uid)
            if(order){
                return res.success200(order)
            }else{
                CustomError.new(errors.notFound);
            }
            
        } catch (error) {
            return next(error);
        }
    }

    report= async (req,res, next)=>{
        try {
            const {uid} = req.params
            const report =await this.service.report(uid)
            if(report){
                return res.success200(report)
            }
            CustomError.new(errors.notFound);
        } catch (error) {
            return next(error);
        }
    }

    destroy= async (req,res, next)=>{
        try {
            const {oid} = req.params
            const order = await this.service.destroy(oid)
            if(order){
                return res.success200(order)
            }else{
                CustomError.new(errors.notFound);
            }
            
        } catch (error) {
            return next(error);
        }
    }

    update= async (req,res, next)=>{
        try {
            const {oid, quantity, state} = req.params
            const order = await ManagerOrders.update(oid,quantity,state)
            if(order){
                return res.success200(order)
            }else{
                CustomError.new(errors.notFound);
            }
            
        } catch (error) {
            return next(error);
        } 
    }
}

export default OrderControler
const  controller = new OrderControler()
const {create, read, readOne, report, update, destroy} = controller
export {create, read, readOne, report, update, destroy}