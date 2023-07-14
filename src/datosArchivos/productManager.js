//const fs = require('fs');
import {__dirname} from "../utils.js";
import path from "path";
import fs from "fs";


export class ProductManager {
    constructor(fileName) {
        this.path = path.join(__dirname,`/files/${fileName}`); //src/files/products.json
    }

 //Metodo para saber si el archivo existe.
    fileExists(){
        return fs.existsSync(this.path);
    }


 //Metodo para obtener productos.
       async getProducts(){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                return products;
            } else {
                throw new Error("No es posible obtener los productos");
            }
        } catch (error) {
            throw error;
        }
    };

//Metodo para agregar productos.
    addProduct(product) {
        const products = this.getProducts();
        product.id = this.generateId(products);
        products.push(product);
        this.saveProducts(products);
        return product.id;
    }

 //Metodo para obtenet productos por id
    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }
 //Metodo para actualizar productos.
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
 //Metodo para eliminar productos.
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
//Metodo para leer productos y pasarlos a string
    saveProducts(products) {
        const data = JSON.stringify(products,null,'\t');
         return fs.writeFileSync(this.path, data);
    }

 //Metodo para generar id.   
    generateId(products) {
        if (products.length === 0) {
            return 1;
        }
        const maxId = Math.max(...products.map(product => product.id));
        return maxId + 1;
    }
}