import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const port= 8080;
const app = express();

//middlewares para trabajar las peticiones de tipo post.
app.use(express.json()) //interpreta en formato json 
app.use (express.urlencoded({extended:true})) //permite trabajar con formularios, ahora no lo vamos a usar.

//routes
app.use ("/api/products", productsRouter);
app.use ("/api/carts", cartsRouter);

app.listen(port, ()=> console.log (`server listening on port ${port}`))
