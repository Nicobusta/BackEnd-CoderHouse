class UserManager{
    static #user=[]
    create(data){
        const newUser = {
            id: UserManager.#user.length===0 
              ? 1 
              : UserManager.#user[UserManager.#user.length-1].id+1,
            name: data.name,
            photo: data.photo,
            email: data.email,
          };
      
            
          if (data.name && data.photo && data.email) {
            
              UserManager.#user.push(newUser);
              
          }else{
      
            return "Los campos name, photo, email son obligatorias"
          } 
    }

    read(){
        return UserManager.#user
    }

    readOne(id){
        const user= UserManager.#user.find((user) => user.id === Number(id));

        if (user) {
          return user;
        } else {
          return "No encontrado";
        }
    }
}

const Manager = new UserManager();
console.log(Manager.create({ photo: "https://picsum.photos/200", email: "jH6Qm@example.com"}));
Manager.create({name: "Roman", photo: "https://picsum.photos/200", email: "jH6Qm@example.com"});
console.log(Manager.read());
/* Manager.readOne(3); */