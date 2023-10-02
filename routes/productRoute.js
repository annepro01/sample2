import express from 'express';
import upload from '../config/fileUpload.js';
import {createProductCtrl, getProductsCtrl, getSingleProductCtrl,updateProductCtrl,deleteProductCtrl} from '../controllers/productCtrl.js'
import { isLoggedIn } from '../middleware/isLoggedIn.js';



const productRoutes = express.Router();

productRoutes.post("/" , isLoggedIn,upload.array("files"),createProductCtrl);
productRoutes.get("/" ,  getProductsCtrl);
productRoutes.get("/:id" ,  getSingleProductCtrl);
productRoutes.put("/:id" ,  isLoggedIn, updateProductCtrl);
productRoutes.delete("/:id/delete" ,  isLoggedIn, deleteProductCtrl);


export default productRoutes;