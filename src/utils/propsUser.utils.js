function propsUserUtils(data) {
    const { name, photo, email } = data;
    if (!name || !photo || !email) {
      const error = new Error(`name & photo & email are required`);
      error.statusCode = 404;
      throw error;
    }
  }
  
  

  export default propsUserUtils;