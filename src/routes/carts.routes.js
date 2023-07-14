import { Router} from "express";
import { CartManager } from "../datosArchivos/cartManager.js";


const cartService = new CartManager("carts.json");


const router = Router();

//crear un carrito
router.post("/", async(req,res)=>{
    try {
        const cartCreated = await cartService.save();
        res.json({status:"success", data:cartCreated});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});


router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.get("/:cid", (req,res)=>{});

export { router as cartsRouter}