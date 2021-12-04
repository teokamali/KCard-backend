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

        return session.toJSON()
    } catch (err) {
        throw err;
    }
}
