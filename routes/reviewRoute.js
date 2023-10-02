import express from "express";
import { createReviewCtrl } from "../controllers/reviewCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";


const reviewRoutes = express.Router();

reviewRoutes.post("/:productID",isLoggedIn,createReviewCtrl)


export default reviewRoutes;
