class ProductManager {
  static #products = [];

  create(data) {

    const newProduct = {
      id: ProductManager.#products.length===0 
        ? 1 
        : ProductManager.#products[ProductManager.#products.length-1].id+1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

      
    if (data.title && data.photo && data.price && data.stock) {
      
        ProductManager.#products.push(newProduct);
        return newProduct;
    }else{

      return "Los campos title, photo, price, stock son obligatorias"
    } 
  
 
  }

  read() {
    return ProductManager.#products;
  }

  readOne(id) {
    const product = ProductManager.#products.find((product) => product.id === Number(id));

    if (product) {
      return product;
    } else {
      return "No encontrado";
    }
  }
}

const Manager = new ProductManager();
console.log(Manager.create({photo: "https://picsum.photos/200", price: 100, stock: 10}));
console.log(Manager.create({title: "Samrtphone", photo: "https://picsum.photos/200", price: 100, stock: 10}))
console.log(Manager.read());
console.log(Manager.readOne(3));