import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { Strategy as JwtStrategy, ExtractJwt }  from "passport-jwt";
import repository from "../repositories/users.rep.js";
import { createToken} from "../utils/token.utils.js";
import errors from "../utils/errors/errors.js";
import {Strategy as GoogleStrategy} from "passport-google-oauth2"
const {GOOGLE_ID, GOOGLE_CLIENT,SECRET} = process.env;


passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await repository.readByEmail({email});
        if (!one) {
          let data = req.body;
          let user = await repository.create(data);
          return done(null, user);
        } else {
          return done(null, false, errors.existPass);
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
        const user = await repository.readByEmail({email});
        if (user?.verified && verifyHash(password, user.password)) {
          const token=createToken({email, role: user.role});
          req.token=token
          return done(null, user);
        } else {
          return done(null, false,errors.auth);
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
        let user = await repository.readByEmail({email:profile.id + "@gmail.com"});
        if (!user) {
          user = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await repository.create(user);
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

//jwt
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: SECRET,
    },
    async (payload, done) => {
      try {
        const user = await repository.readByEmail({email:payload.email});
        if (user) {
          user.password = null;
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
export default passport;