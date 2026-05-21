import express from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = express.Router();


// Step A: Create Order
router.post("/create-order",verifyToken, createOrder);

// Step B: Verify Payment
router.post("/verify-payment",verifyToken, verifyPayment);

export default router;
