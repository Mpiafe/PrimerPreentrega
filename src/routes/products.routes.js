import { Router} from "express";
import { ProductManager } from "../dao/productManager.js";


const productService = new ProductManager('products.json');
const router= Router ();
const products= [];

router.get("/", (req,res)=>{});
router.get ("/:pid", (req,res)=>{});
router.post ("/", (req,res)=>{
    const productInfo= req.body;
    if (!productInfo.title || !productInfo.description || productInfo.code || productInfo.price || productInfo.status || productInfo.stock || productInfo.category ){
        return res.json ({status:"error", message: "campos incompletos"})
    } else {
        addProduct(product)
    }
});

router.put ("/:pid", (req, res)=>{})



export { router as productsRouter}