import express from 'express';
import {createColorCtrl,getAllColorsCtrl,getSingleColorCtrl,updateColorCtrl,deleteColorCtrl} from '../controllers/colorCtrl.js'
import { isLoggedIn } from '../middleware/isLoggedIn.js';


const colorRoutes = express.Router();

colorRoutes.post("/",isLoggedIn,createColorCtrl)
colorRoutes.get("/",getAllColorsCtrl)
colorRoutes.get("/:id",getSingleColorCtrl)
colorRoutes.put("/:id",isLoggedIn,updateColorCtrl)
colorRoutes.delete("/:id/delete",isLoggedIn,deleteColorCtrl)

export default colorRoutes;