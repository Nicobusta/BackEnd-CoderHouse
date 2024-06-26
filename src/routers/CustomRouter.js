import { Router } from "express";
import jwt from "jsonwebtoken";
import users from "../data/mongo/users.mongo.js";
import errors from "../utils/errors/errors.js";
import env from '../utils/env.utils.js';
export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}
  applyCbs(cbs) {
    return cbs.map((each) => async (...params) => {
      try {
        await each.apply(this, params);
      } catch (error) {
          params[1].json({
          statusCode: 500,
          message: error.message,
        });
      }
    });
  }

  responses = (req, res, next) => {
    res.success200 = (payload) =>
      res.json({ statusCode: 200, response: payload });
    res.success201 = (payload) =>
      res.json({ statusCode: 201, response: payload });
    res.error400 = (message) => res.json(errors.message(message));
    res.error401 = () => res.json(errors.auth);
    res.error403 = () => res.json(errors.forbidden);
    res.error404 = () => res.json(errors.notFound);
    return next();
  };

  policies = (policies) => async (req, res, next) => {
    try {
      if (policies.includes("PUBLIC")) return next();
      
      let token = req.cookies["token"];

      if (!token) {
        return res.error401();
      }else {
        const data = jwt.verify(token, env.SECRET);
        if (!data){

          return res.error400("Bad auth by token!");
          
        } else {

          const { email, role } = data;
          if (
            (role === 0 && policies.includes("USER")) ||
            (role === 1 && policies.includes("ADMIN")) ||
            (role === 2 && policies.includes("PREM"))
          ) {
            const user = await users.readByEmail({email});
            req.user = user;
            return next();
          } else{
            return res.error403();
          }
        }
      }
    } catch (error) {
      return next(error)
    }
  };

  post(path, policies, ...cbs) {
    this.router.post(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  get(path, policies, ...cbs) {
    this.router.get(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  put(path, policies, ...cbs) {
    this.router.put(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  delete(path, policies, ...cbs) {
    this.router.delete(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCbs(cbs));
  }
}