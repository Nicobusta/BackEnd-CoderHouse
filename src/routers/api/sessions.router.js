import { Router } from "express";
import has8char from "../../middlewares/has8char.js";
import isValidPass from "../../middlewares/isValidPass.js"; 
import passport from "../../middlewares/passport.js";
import passCallBack from "../../middlewares/passCallBack.js";



const sessionsRouter = Router();

//google
sessionsRouter.post(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }));

//google-callback
sessionsRouter.get(
  "/google/cb",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with google!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//register
sessionsRouter.post("/register", has8char,  passport.authenticate("register", {session: false, failureRedirect: "/api/sessions/badauth",}), async (req, res, next) => {
  try {
    return res.json({
      statusCode: 201,
      message: "Registered!",
    });
  } catch (error) {
    return next(error);
  }
});

//login
sessionsRouter.post("/login", passport.authenticate("login", {session: false, failureRedirect: "/api/sessions/badauth",}), async (req, res, next) => {
  try {
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        token: req.session.token,
      });
    }catch (error) {
    return next(error);
  }
});

//signout
sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.token) {
      req.session.destroy(); 
      return res.json({
        statusCode: 200,
        message: "Signed out!",
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

//badauth
sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

//forbidden
sessionsRouter.get("/forbidden", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

//me
sessionsRouter.post("/", async (req, res, next) => {
  try {
    if(req.session.token){
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        token: req.session.token,
      });
    }else{
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});
export default sessionsRouter;