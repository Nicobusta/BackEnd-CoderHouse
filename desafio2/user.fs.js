const fs = require("fs");

class UserManager{
    static #user=[]

    constructor() {
      this.path = "./data/user.json";
      this.conf = "utf-8";
      this.init();
    }

    init() {
      const exist = fs.existsSync(this.path);
      if (exist) {
        UserManager.#user = JSON.parse(
          fs.readFileSync(this.path, this.conf)
        );
      } else {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      }
    }

    create(data){
        try {
          if (!data.name || !data.photo || !data.email) {
            throw new Error(
              "Los campos name, photo, email son obligatorias"
            );
          }
          const newUser = {
            id: UserManager.#user.length===0 
              ? 1 
              : UserManager.#user[UserManager.#user.length-1].id+1,
            name: data.name,
            photo: data.photo,
            email: data.email,
          };

          UserManager.#user.push(newUser);
          fs.writeFileSync(
            this.path,
            JSON.stringify(UserManager.#user, null, 2)
          );
          return "Usuario creado";
        } catch (error) {
          return error.message;
        }
    }

    read(){
      try {
        if (UserManager.#user.length === 0) {
          throw new Error("No se encontraron usuarios!");
        } else {
          return UserManager.#user;
        }
      } catch (error) {
        return error.message;
      }
    }

    readOne(id){
      try {
        const user =UserManager.#user.find(
          (user) => user.id === Number(id)
        );
        if (!user) {
          throw new Error("No se encontro producto!");
        } else {
          return user;
        }
      } catch (error) {
        return error.message;
      }
    }
}

const Manager = new UserManager();
console.log(Manager.read());
console.log(Manager.create({ photo: "https://picsum.photos/200", email: "jH6Qm@example.com"}));
console.log(Manager.create({name: "Roman", photo: "https://picsum.photos/200", email: "jH6Qm@example.com"}))
console.log(Manager.read());
console.log(Manager.readOne(1));
console.log(Manager.readOne(3))