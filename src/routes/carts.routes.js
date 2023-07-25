import { Router } from "express";
import { CartManager } from "../datosArchivos/cartManager.js";
import { ProductManager } from "../datosArchivos/productManager.js";

const cartService = new CartManager("carts.json");
const productService = new ProductManager("products.json");

const router = Router();

router.post("/", async(req,res)=>{
    try {
        const cartCreated = await cartService.save();
        res.json({status:"success", data:cartCreated});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.get("/:cid", async (req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartService.getCartById(cartId);
        if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
        } else {
            res.send(cart);
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.post("/:cid/product/:pid", async(req,res)=>{
    try { 
        const { cid, pid } = req.params;
        const cart = await cartService.getCartById(cartId);
        if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
        }  else {
            res.send(cart);
        }
        const existProduct = cart.products.find((product) => product.id === pid);
       if (existProduct) {
      existProduct.quantity += 1;
       } else {
        const newProduct = {
        product: pid,
        quantity: 1,
      };
    }
    cart.products.push(newProduct);
        
    } catch (error) {
        res.status(200).json({ message: "Product added to cart successfully" });
    }});
    
  

 
export {router as cartsRouter}