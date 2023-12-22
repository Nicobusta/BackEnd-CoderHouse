import crypto from "crypto";

class UserManager{
    static #user=[]

    constructor() {
    }

    create(data){
      try {
        const newUser = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
    
          
        if (data.name && data.photo && data.email) {
          
            UserManager.#user.push(newUser);
            return newUser;
        }else{
            throw new Error(
              "Los campos name, photo, email son obligatorias" 
            )
        }
      } catch (error) {
        return error.message;
      }
         
    }

    read(){
      try {
        if(UserManager.#user.length === 0){
          throw new Error("No se encontro ningun usuario")
        }else{
          return UserManager.#user
        }
      } catch (error) {
        return error.message;
      }
      
    }

    readOne(id){
      try {
          const user= UserManager.#user.find((user) => user.id === Number(id));
      
          if(user){
            return user
          }else{
            throw new Error("No encontrado")
          }
        } catch (error) {
          return error.message
        }
    }
}

const Manager = new UserManager();
console.log(Manager.create({ photo: "https://picsum.photos/200", email: "jH6Qm@example.com"}));
Manager.create({name: "Roman", photo: "https://picsum.photos/200", email: "jH6Qm@example.com"});
console.log(Manager.read());
/* Manager.readOne(3); */