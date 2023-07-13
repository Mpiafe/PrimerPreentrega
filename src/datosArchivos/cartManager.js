import { __dirname } from "../utils.js";
import path from "path";
import fs from "fs";

export class CartManager{
    constructor(fileName){
        this.path=path.join(__dirname,`/files/${fileName}`); //src/files/carts.json
    };

    fileExists(){
        return fs.existsSync(this.path);
    }
}