import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import passport from 'passport';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/config/db.js';
import userRouter from './src/routes/user.route.js';
import {initPassport} from './src/config/passport.js';
import session from 'express-session';
import paymentRoutes from "./src/routes/payments.routes.js";




const app=express();
const PORT=process.env.PORT || 3000;



app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());
initPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth',userRouter);
app.use("/api/payment", paymentRoutes);


connectDB().then(app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}))

