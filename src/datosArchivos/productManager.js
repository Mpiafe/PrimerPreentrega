//const fs = require('fs');
import {__dirname} from "../utils.js";
import path from "path";
import fs from "fs";


export class ProductManager {
    constructor(fileName) {
        this.path = path.join(__dirname,`/files/${fileName}`); //src/files/products.json
    }

    fileExists(){
        return fs.existsSync(this.path);
    }

     async getProducts() {
        try {
            const data =  await fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe o está vacío, retorna un arreglo vacío
            return [];
        }
    }
;

    addProduct(product) {
        const products = this.getProducts();
        product.id = this.generateId(products);
        products.push(product);
        this.saveProducts(products);
        return product.id;
    }


    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            const updatedProduct = { ...products[index], ...updatedFields };
            products[index] = updatedProduct;
            this.saveProducts(products);
            return true;
        }

        return false;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
            this.saveProducts(products);
            return true;
        }

        return false;
    }

    saveProducts(products) {
        const data = JSON.stringify(products, null, 2);
        fs.writeFileSync(this.path, data);
    }

    generateId(products) {
        if (products.length === 0) {
            return 1;
        }
        const maxId = Math.max(...products.map(product => product.id));
        return maxId + 1;
    }
}