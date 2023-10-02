import express from 'express';
import { createCouponCtrl,getAllCouponsCtrl,getSingleCouponCtrl,UpdateCouponCtrl,deleteCouponCtrl } from '../controllers/couponsCtrl.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


const couponRoutes = express.Router();

couponRoutes.post("/",isLoggedIn,createCouponCtrl)
couponRoutes.get("/",isLoggedIn,getAllCouponsCtrl)
couponRoutes.get("/:id",isLoggedIn,getSingleCouponCtrl)
couponRoutes.put("/:id",isLoggedIn,UpdateCouponCtrl)
couponRoutes.delete("/:id/delete",isLoggedIn,deleteCouponCtrl)



export default couponRoutes