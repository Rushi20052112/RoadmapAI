import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, currency = "INR" } = req.body;
    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency,
            receipt: `receipt_${Date.now()}`,
        });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planName, credits } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign)
        .digest("hex");

    if (expected === razorpay_signature) {
        await User.findByIdAndUpdate(req.userId, {
            plan: planName,                          // "PRO" or "CREDITS"
            credits: credits || 0,         // add credits if CREDITS plan
        });
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
    }
};