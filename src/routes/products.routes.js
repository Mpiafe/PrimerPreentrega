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
router.get("/products",(req,res)=>{
            try {
                const result = ProductManager.getProducts();
                console.log("result: ", result);
                const limite = parseInt(req.query.limit);
                console.log("limite: ", limite);
                if (limite>0) {
                    resultado = result.filter(producto=>producto.id <= limite);
                } else {
                    resultado = result;
                }
                res.send(resultado);
            } catch (error) {
                res.json({status:"error", message:error.message});
            }
        });

//devolver productos segun id.
router.get ("/:pid", (req,res)=>{
    try {
       const productId = parseInt(req.params.pid);
       const product = productService.getProductById(pid);
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
router.delete('/productos/:id',(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const productIndex = products.findIndex((product) => product.id === productId);
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