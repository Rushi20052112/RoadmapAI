import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (res, userId) => {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });  
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "45m" });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 45 * 60 * 1000 // 45 minutes
    });
    return refreshToken; // Return the refresh token to save in the database
}