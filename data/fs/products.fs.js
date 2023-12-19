const fs = require("fs");

class ProductManager {
  static #products = [];

  constructor() {
    this.path = "./data/products.json";
    this.conf = "utf-8";
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    if (exist) {
      ProductManager.#products = JSON.parse(
        fs.readFileSync(this.path, this.conf)
      );
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error(
          "Los campos title, photo, price, stock son obligatorias"
        );
      }
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

      ProductManager.#products.push(newProduct);

      fs.writeFileSync(
        this.path,
        JSON.stringify(ProductManager.#products, null, 2)
      );
      return "Producto creado";
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("No se encontraron productos!");
      } else {
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
      if (!product) {
        throw new Error("No se encontro producto!");
      } else {
        return product;
      }
    } catch (error) {
      return error.message;
    }
  }
}

const Manager = new ProductManager();
console.log(Manager.create({photo: "https://picsum.photos/200", price: 100, stock: 10})); 
console.log(Manager.create({title: "Samrtphone", photo: "https://picsum.photos/200", price: 100, stock: 10}))
console.log(Manager.read());
console.log(Manager.readOne(3));
console.log(Manager.readOne(1)); 

  
