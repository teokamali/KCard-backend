import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { urlToHttpOptions } from "url";
import SessionModel, { SessionDocument } from "../models/session.model";

export async function createUserSession(userId: string, userAgent: string) {
    try {
        const session = await SessionModel.create({
            user: userId,
            userAgent,
        });

        return session.toJSON();
    } catch (err) {
        throw err;
    }
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    try {
        const sessions = await SessionModel.find(query);

        return sessions;
    } catch (err) {
        throw err;
    }
}

export async function findSession(query: FilterQuery<SessionDocument>, options?: QueryOptions | undefined) {
    try {
        const sessions = await SessionModel.findOne(query, options);

        return sessions;
    } catch (err) {
        throw err;
    }
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    try {
        const session = await SessionModel.updateOne(query, update);
        return session;
    } catch (err) {
        throw err;
    }
}
