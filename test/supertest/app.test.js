import "dotenv/config.js";
import env from '../../src/utils/env.utils.js';
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/factory.js";
const { products, users, orders } = dao;

 const requester = supertest("http://localhost:" + env.PORT + "/api");

describe("Testeando el ecommerce", () => {

  describe("Testeando users", () => {
    const user = {
      name: "Nico",
      email: "nico@nico.com",
      password: "hola1234",
      role: 0,
    };
    let uid;
    let token = {};

    /* it("Registro de un usuario correctamente", async function() {
      this.timeout(5000); // Aumenta el tiempo de espera a 5000ms
    
      try {
        const response = await requester.post("/sessions/register").send(user);
        const { _body, statusCode } = response;
        //uid = _body.payload._id;
        console.log(response);
        expect(statusCode).to.be.equals(200);
      } catch (error) {
        console.error("Error en el test:", error);
        throw error; // Lanza el error para que el test falle correctamente
      }
    }); */

    /* it("Registro de un usuario correctamente", async () => {
      const response = await requester.post("/sessions/register").send(user);
      const { _body, statusCode } = response;
      //uid = _body.payload._id;
      console.log(response);
      expect(statusCode).to.be.equals(201);
    }); */

    it("Inicio de sesión correctamente", async () => {
      const response = await requester.post("/sessions/login").send(user);
      const { statusCode, headers } = response; 
      console.log(response);
      token.key = headers["set-cookie"][0].split("=")[0];
      token.value = headers["set-cookie"][0].split("=")[1];
      expect(statusCode).to.be.equals(200);
    });

    /*it("Cerrado de sesión correctamente", async () => {
      const response = await requester.post("/sessions/signout").set("Cookie", [
        token.key + "=" + token.value,
      ]);
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });

    it("Eliminación de un usuario correctamente", async () => {
      console.log(uid);
      const response = await requester.delete("/users/" + uid);
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    }); */

  }); 

  
  describe("Testeando Orders", () => {
  
  })

  describe("Testeando Users", () => {
    
  })

})
