import express from 'express';
import { createBrandCtrl,getAllBrandCtrl,getSingleBrandCtrl,updateBrandCtrl,deleteBrandCtrl } from '../controllers/brandCtrl.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


const brandRoutes = express.Router();

brandRoutes.post("/",isLoggedIn,createBrandCtrl);
brandRoutes.get("/",getAllBrandCtrl);
brandRoutes.get("/:id",getSingleBrandCtrl);
brandRoutes.put("/:id",isLoggedIn,updateBrandCtrl);
brandRoutes.delete("/:id/delete",isLoggedIn,deleteBrandCtrl);

export default brandRoutes;