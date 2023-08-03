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
router.get("/",validateFields, async(req,res)=>{
         try {
         const limit = req.query.limit;
         const products = await productService.getProducts();
         if(limit){
            const limitedProducts = products.slice(0, parseInt(limit));
            res.send(limitedProducts);
            } else {
            res.json({status:"success", data:products});
            }
        } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

//devolver productos segun id.
router.get ("/:pid", async (req,res)=>{
    try {
       const productId = parseInt(req.params.pid);
       const product =  await productService.getProductById(productId);
       if(!product){
           res.send("El producto no existe");
       }else {
           res.send(product);
       }
       } catch (error) {
           res.json({status:"error", message:error.message});
    } 
   });

  
//Agregar el producto
router.post("/", validateFields, async(req,res)=>{
    try {
        const productInfo = req.body;
        const productCreated = await productService.addProduct(productInfo);
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

//eliminar el producto
router.delete('/productos/:id', async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const productIndex = await products.findIndex((product) => product.id === productId);
           if (productIndex !== -1) {
      // Eliminamos el producto encontrado del array.
           products.splice(productIndex, 1);
           return res.status(200).json({ message: 'Producto eliminado con éxito.' });
        } else {
         return res.status(404).json({ message: 'Producto no encontrado.' })}
        
        } catch (error) {
        res.status(404).json({status:"error", message:"el usuario no existe"});  
    }
});




export { router as productsRouter}