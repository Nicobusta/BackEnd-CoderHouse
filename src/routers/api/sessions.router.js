import CustomRouter from "../CustomRouter.js";
import has8char from "../../middlewares/has8char.js";
import passport from "../../middlewares/passport.js";
import passCallBack from "../../middlewares/passCallBack.js";
import {
  register,
  login,
  signout,
  me,
  forbidden,
  signoutError,
  badauth,
  verifyAccount,
} from "../../controllers/sessionControler.js";

class SessionsRouter extends CustomRouter {
  init() {
    //google
    /* this.post(
        "/google",
        passport.authenticate("google", { scope: ["email", "profile"] }));

      //google-callback
      this.get(
        "/google/cb",
        passport.authenticate("google", {
          session: false,
          failureRedirect: "/api/sessions/badauth",
        }),
        async (req, res, next) => {
          try {
            return res.success200({
              message: "Logged in with google!",
              session: req.session,
            })
              
          } catch (error) {
            return next(error);
          }
        }
      ); */

    //register
    this.post("/register", ["PUBLIC"], has8char, passCallBack("register"), register);

    //login
    this.post("/login", ["PUBLIC"], passCallBack("login"), login);

    //signout
    this.post("/signout", ["USER", "ADMIN", "PREM"], passCallBack("jwt"), signout);

    //badauth
    this.get("/badauth", ["PUBLIC"], badauth);

    //forbidden
    this.get("/forbidden", ["PUBLIC"], forbidden);

    //me
    this.post("/", ["USER", "ADMIN", "PREM"], passCallBack("jwt"), me);

    this.get("/signoutError", ["PUBLIC"], signoutError);

    this.post("/verifyAccount", ["PUBLIC"], verifyAccount);
  }
}

export default SessionsRouter;
