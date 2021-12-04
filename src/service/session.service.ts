import mongoose from "mongoose";
import SessionModel from "../models/session.model";

export async function createUserSession(
    userId: string,
    userAgent: string
) {
    try {
        const session = await SessionModel.create({
            user: userId,
            userAgent,
        });

        return session;
    } catch (err) {
        throw err;
    }
}
