import jwt from "jsonwebtoken";
import env from "./env.utils.js";
import CustomError from "./errors/CustomError.js";
import errors from "./errors/errors.js";

function createToken(data) {
  const token = jwt.sign(
    data, 
    env.SECRET,
    { expiresIn: 60 * 60 * 24 * 7 }
  );
  return token;
}

function verifyToken(headers) {
  if (token) {
    const data = jwt.verify(token, env.SECRET);
    return data;
  }
  CustomError.new(errors.message("bad auth token"));
}

export { createToken, verifyToken };