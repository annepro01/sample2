import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from "cors";
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import { globalErrHandler,notFound } from '../middleware/globalErrHandle.js';
import productRoutes from '../routes/productRoute.js';
import categoryRoutes from '../routes/categoryRoute.js';
import brandRoutes from '../routes/brandRoute.js';
import colorRoutes from '../routes/colorRoute.js';
import reviewRoutes from '../routes/reviewRoute.js';
import orderRoutes from '../routes/orderRoute.js';
import couponRoutes from '../routes/couponRoute.js';


//dBConnect
dbConnect();

const app = express();
//cors
app.use(cors())



//pass incoming data
app.use(express.json());



//routes
app.use('/api/v1/users/',userRoutes);
app.use('/api/v1/products/',productRoutes);
app.use('/api/v1/category/',categoryRoutes);
app.use('/api/v1/brand/',brandRoutes);
app.use('/api/v1/color/',colorRoutes);
app.use('/api/v1/review/',reviewRoutes);
app.use('/api/v1/orders/',orderRoutes);
app.use('/api/v1/coupons/',couponRoutes);




//error middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;