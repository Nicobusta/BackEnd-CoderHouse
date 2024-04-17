import {faker} from "@faker-js/faker"
import repository from './../../repositories/products.rep.js';
import logger from "../../utils/logger/index.js";


function productMock() {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.datatype.number({ min: 0, max: 100 }),
       };
}

async function createProducts() {
    try {
        for (let i = 0; i < 100; i++) {
            await repository.create(productMock());
        }
    } catch (error) {
        logger.WARN(error.message);
    }
}

createProducts()