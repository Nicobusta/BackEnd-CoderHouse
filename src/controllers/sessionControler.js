class SecssionControler{
    constructor(){
        
    }

    register= async (req,res, next)=>{
        try {
            return res.success201("Registered!");
          } catch (error) {
            return next(error);
          }
    }

    login= async (req,res, next)=>{
        try {
            return res.cookie("token", req.token, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .success200("Logged in!");
          }catch (error) {
          return next(error);
        }
    }

    signout= async (req,res, next)=>{
        try {
            return res.clearCookie("token").success200("Signed out!");
        } catch (error) {
          return next(error);
        }
    }

    badauth= (req,res, next)=>{
        try {
            return res.error401();
          } catch (error) {
            return next(error);
          }
    }

    forbidden= async (req,res, next)=>{
        try {
            return res.error403();
          } catch (error) {
            return next(error);
          }
    }

    me= async (req,res, next)=>{
        try {
            const user = {
              email: req.user.email,
              role: req.user.role,
            }
            return res.success200(user)
          } catch (error) {
            return next(error);
          }
    }

    signoutError= (req,res, next)=>{
        try {
            return res.error400("Already done");
          } catch (error) {
            return next(error);
          }
    }
}

export default SecssionControler
const  controller = new SecssionControler()
const {register, login, signout, me, badauth, forbidden, signoutError} = controller
export {register, login, signout, me, badauth, forbidden, signoutError}