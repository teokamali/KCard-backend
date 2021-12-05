import { NextFunction, Request, Response } from "express";
import config from "config";
import { omit } from "lodash";
import status from "http-status";
import { createUserSession, findSessions, updateSession } from "../service/session.service";
import { validateUserCerdential } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response, next: NextFunction) {
    try {
        // validate user's password
        const user = await validateUserCerdential(req.body);

        if (!user) {
            throw {
                message: "Invalid email or password",
                status: status.UNAUTHORIZED,
            };
        }

        // create session
        const session = await createUserSession(user._id, req.get("user-agent") || "");

        // create accessToken
        const accessToken = signJwt(
            {
                ...omit(user.toJSON(), "password"),
                session: session._id,
            },
            {
                expiresIn: config.get<string>("ttl.accessToken"),
            }
        );

        // create refreshToken
        const refreshToken = signJwt(session, {
            expiresIn: config.get<string>("ttl.refreshToken"),
        });

        // send accessToken and refreshToken
        res.status(status.OK).json({
            success: true,
            refreshToken,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
}

export async function getUserSessionsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.user._id;
        const sessions = await findSessions({ user: userId });

        res.status(status.OK).json(sessions);
    } catch (err) {
        next(err);
    }
}

export async function invalidateUserSessionHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.user._id;
        await updateSession(
            {
                user: userId,
            },
            {
                valid: false,
            }
        );

        res.status(status.OK).json({
            success: true,
            refreshToken: null,
            accessToken: null,
        });
    } catch (err) {
        next(err);
    }
}
