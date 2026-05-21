import { generateTokenAndSetCookie } from "../../../../Auth-System/backend/utils/generateTokenAndSetCookie.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RoadmapModel from "../models/roadmap.model.js";

export async function register(req, res) {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString() // Generate a random 6-digit verification token
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hours
        // Create new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt
        });

        await newUser.save();

        const refreshToken = await generateTokenAndSetCookie(res, newUser._id);
        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const refreshToken = await generateTokenAndSetCookie(res, user._id);
        user.refreshToken = refreshToken;
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({ message: "Login successful", user:{...user._doc, password: undefined} });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        await UserModel.findOneAndUpdate({ refreshToken }, { refreshToken: null });
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ message: "Logout successful" });

}

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: "No refresh token" })
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await UserModel.findById(decoded.userId)

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: "Invalid refresh token" })
        }

        const newAccessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        res.cookie("token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
            maxAge: 45 * 60 * 1000
        })

        res.status(200).json({ success: true, message: "Access token refreshed" })

    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired refresh token" })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.error("Error checking Auth", error)
        throw new Error(`Error checking Auth:${error}`)
    }
}

export const getUserData = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }  
        res.status(200).json({ success: true, user })      
    } catch (error) {
        console.error("Error fetching user data", error)
        res.status(500).json({ message: "Server error" })
    } 
}                   

export const updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;

        const existing = await UserModel.findOne({ email, _id: { $ne: req.userId } });
        if (existing) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const user = await UserModel.findByIdAndUpdate(
            req.userId,
            { username, email },
            { new: true }
        ).select("-password");

        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ message: "Failed to update profile" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await UserModel.findById(req.userId);
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated" });
    } catch (err) {
        res.status(500).json({ message: "Failed to change password" });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        await RoadmapModel.deleteMany({ userId: req.userId });
        await UserModel.findByIdAndDelete(req.userId);

        res.clearCookie("token");
        res.clearCookie("refreshToken");

        res.status(200).json({ success: true, message: "Account deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete account" });
    }
};

export const googleCallback = async (req, res) => {
    try {
        const user = req.user;

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "45m" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 45 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.redirect(process.env.CLIENT_URL + "/dashboard");
    } catch (err) {
        console.error("Google OAuth callback error:", err);
        res.redirect(process.env.CLIENT_URL + "/login");
    }
};