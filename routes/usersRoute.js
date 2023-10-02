import express from 'express';
import { registerUserController,loginUserCtrl,getUserProfile,updateShippingAddressCtrl, } from '../controllers/userController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const userRoutes = express.Router();

userRoutes.post("/register" , registerUserController);
userRoutes.post("/login" , loginUserCtrl);
userRoutes.get("/profile", isLoggedIn,getUserProfile);
userRoutes.put("/update/shipping", isLoggedIn,updateShippingAddressCtrl);


export default userRoutes;