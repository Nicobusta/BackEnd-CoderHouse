class ProductManager {
  static #products = [];
  constructor() {
  }

  create(data) {
    try {
      const newProduct = {
        id:
          ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id +
              1,
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };

      if (data.title && data.photo && data.price && data.stock) {
        ProductManager.#products.push(newProduct);
        return newProduct;
      } else {
        throw new Error(
          "Los campos title, photo, price, stock son obligatorias"
        );
      }
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if(ProductManager.#products.length === 0){
        throw new Error("No se encontro ningun producto")
      }else{
        return ProductManager.#products;
      }
    } catch (error) {
      return error.message;
    }
    
  }

  readOne(id) {
    try {
      const product = ProductManager.#products.find(
        (product) => product.id === Number(id)
      );

      if(product){
        return product
      }else{
        throw new Error("No encontrado")
      }
    } catch (error) {
      return error.message
    }
    
  }
}

const Manager = new ProductManager();

console.log(Manager.create({ photo: "https://picsum.photos/200", price: 100, stock: 10 })); 

console.log(Manager.read());
