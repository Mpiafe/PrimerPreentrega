import { Router} from "express";
import { ProductManager } from "../datosArchivos/productManager.js";

const router= Router ();

//middleware de validacion
const validateFields = (req,res,next)=>{
    const productInfo = req.body;
    if(!productInfo.title || !productInfo.description || !productInfo.price || !productInfo.stock || productInfo.category){
        return res.json({status:"error", message:"campos incompletos"})
    } else {
        next(); // continua al siguiente callback
    }
};

const productService = new ProductManager('products.json');


//rutas de los servicios.

//devolver productos de acuerdo al limite
router.get("/", async(req,res)=>{
    try {
        let limit = parseInt(req.query.limit);
        let result = await productsService.getProducts();
        if (limit) {
            result = result.slice(0, limit);
            return res.send(result);
        } else {
            res.json({status:"success", data:products});
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
        }
        });

//Agregar el producto
router.post("/", validateFields, async(req,res)=>{
    try {
        const productInfo = req.body;
        const productCreated = await productService.saveProducts(productInfo);
        res.json({status:"success", data:productCreated, message:"producto creado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

//actualizar un producto
router.put("/:pid",validateFields, async (req,res)=>{
    try {
        const productInfo = req.body;
        const productUpdate= await productService.updateProduct (productInfo)
        res.json({status:"success", data:productUpdate, message:"producto actualizado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
   
});

//devolver productos segun id.
router.get ("/:pid", (req,res)=>{
    const userId = parseInt(req.params.userId);
    // console.log("userId",userId);
    const user = users.find(elm=>elm.id === userId);
    if(!user){
        res.send("El usuario no existe");
    } else {
        res.send(user);
    }
});


//eliminar el producto
router.delete("/:pid",(req,res)=>{

});




export { router as productsRouter}