import express from 'express';
import { createOrderCtrl,getAllordersCtrl,getSingleOrderCtrl,updateOrderCtrl } from '../controllers/orderCtrl.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


const orderRoutes = express.Router();

orderRoutes.post("/",isLoggedIn,createOrderCtrl);
orderRoutes.get("/",isLoggedIn,getAllordersCtrl)
orderRoutes.get("/:id",isLoggedIn,getSingleOrderCtrl)
orderRoutes.put("/update/:id",isLoggedIn,updateOrderCtrl)

export default orderRoutes;
