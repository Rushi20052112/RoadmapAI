import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/user.model.js";
import bcypt from "bcrypt";

export const initPassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: 'https://roadmapai-ebw2.onrender.com/api/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await UserModel.findOne({ email: profile.emails[0].value });

                    if (!user) {
                        const passwordHash = await bcypt.hash("google_oauth_" + profile.id, 10);
                        user = await UserModel.create({
                            username: profile.displayName,
                            email: profile.emails[0].value,
                            password: passwordHash,
                        });
                    }
                    user.lastLogin = new Date();
                    await user.save();

                    return done(null, user);
                } catch (err) {
                    return done(err, null);
                }
            }
        )
    );
    return passport;
};