const socket= io();

socket.on("products", (data) => {
    //console.log(data);
    const template = data
      .map(
        (each) => `
        <div class="card m-2" style="width: 360px">
          <img src="${each.photo}" style="height: 240px" class="card-img-top object-fit-cover" alt="${each.title}">
          <h5 class="p-2 text-center card-title">${each.title}</h5>
        </div>
      `
      )
      .join("");
    document.querySelector("#products").innerHTML = template;
  });
