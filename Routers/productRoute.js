import express from 'express';
import { createProduct,deleteProduct,getProduct, getProductById, updateProduct } from '../Contollers/productController.js';


const router =express.Router();

router.post("/create-product",createProduct );
router.get("/get-product",getProduct );
router.put("/update-product/:id",updateProduct );
router.delete("/delete-product/:id",deleteProduct);
router.get("/get-product/:id",getProductById)


export default router;