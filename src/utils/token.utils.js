import jwt from "jsonwebtoken";
import env from "./env.utils.js";

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
  const error = new Error("bad auth token");
  error.statusCode = 401;
  throw error;
}

export { createToken, verifyToken };