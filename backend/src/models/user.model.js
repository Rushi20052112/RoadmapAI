import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: false, // Not required for Google OAuth users
    },
    plan: {
        type: String,
        enum: ["FREE", "PRO", "CREDITS"],
        default: "FREE",
    },
    credits: {
        type: Number,
        default: 3,
    },
    refreshToken: {
        type: String,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiresAt: {
        type: Date,
    },
    lastLogin: {
        type: Date,
    }



}, { timestamps: true });

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;