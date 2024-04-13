import errors from "./errors/errors.js";
import CustomError from './errors/CustomError.js';

function has8charUtils(password) {
    if (password.length < 8) {
      CustomError.new(errors.message("Password must have at least 8 characters"));
      
    }
  }
  
  export default has8charUtils;