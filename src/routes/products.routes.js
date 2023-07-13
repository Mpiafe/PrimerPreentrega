import { Router} from "express";
import { ProductManager } from "../dao/productManager.js";


const productService = new ProductManager('products.json');

const validateFields= (req, res, next)=>{
    const productInfo = req.body;
    if (!productInfo.title || !productInfo.description || productInfo.code || productInfo.price || productInfo.status || productInfo.stock || productInfo.category ){
        return res.json ({status:"error", message: "campos incompletos"})
    } else {
        next();
    }
};


const router= Router ();

router.get("/", (req,res)=>{});
router.get ("/:pid", (req,res)=>{});
router.post ("/",validateFields, (req,res)=>{
    const productInfo = req.body;
});

router.put ("/:pid",validateFields, (req, res)=>{
    const productInfo = req.body;
});

router.delete ("/;pid",(req, res)=>{

});



export { router as productsRouter}