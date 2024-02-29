import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { ManagerUser } from "../data/mongo/manager.mongo.js";
import {Strategy as GoogleStrategy} from "passport-google-oauth2"
import { createToken} from "../utils/token.utils.js";
const {GOOGLE_ID, GOOGLE_CLIENT} = process.env;


passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await ManagerUser.readByEmail({email});
        if (!one) {
          let data = req.body;
          data.password = createHash(password);
          let user = await ManagerUser.create(data);
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await ManagerUser.readByEmail({email});
    
        if (user && verifyHash(password, user.password)) {
          const token=createToken({email, role: user.role});
          req.session.token=token
          req.session.role = user.role;
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/cb",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await ManagerUser.readByEmail({email:profile.id + "@gmail.com"});
        if (!user) {
          user = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await ManagerUser.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


export default passport;