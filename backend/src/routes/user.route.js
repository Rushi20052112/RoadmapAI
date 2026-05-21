import express from 'express';
import { changePassword, checkAuth, deleteAccount, getUserData, login, logout, refreshAccessToken, register, updateProfile,googleCallback } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { createRoadmap, getUserRoadmaps, markWeekCompleted } from '../controllers/roadmap.controller.js';
import passport from "passport"

const userRouter=express.Router();

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.post("/refresh-token", refreshAccessToken)
userRouter.get("/check-auth", verifyToken,checkAuth)
userRouter.get("/get-user-data", verifyToken, getUserData);
userRouter.put("/update-profile", verifyToken, updateProfile);
userRouter.put("/change-password", verifyToken, changePassword);
userRouter.delete("/delete-account", verifyToken, deleteAccount);


userRouter.post("/roadmap-generate",verifyToken,createRoadmap)
userRouter.get("/my-roadmaps", verifyToken, getUserRoadmaps);
userRouter.patch("/roadmap/:roadmapId/week/:weekId/complete", verifyToken, markWeekCompleted);


userRouter.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"], session: false, prompt: "select_account" })
);

userRouter.get("/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    googleCallback
);

export default userRouter;