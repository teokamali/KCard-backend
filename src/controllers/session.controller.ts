import config from "config";
import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import { createUserSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response, next: NextFunction) {
    try {
        // validate user's password
        const user = await validatePassword(req.body);

        if (!user) {
            throw {
                message: "Invalid email or password",
                status: 401,
            };
        }

        // create session
        const session = await createUserSession(user._id, req.get("user-agent") || "");
        console.log("user", user);
        console.log("session", session);
        // create accessToken
        const accessToken = signJwt(
            {
                ...omit(user.toJSON(), "password"),
                session: session.toJSON()._id,
            },
            {
                expiresIn: config.get<string>("ttl.accessToken"),
            }
        );

        // create refreshToken

        const refreshToken = signJwt(session.toJSON(), {
            expiresIn: config.get<string>("ttl.refreshToken"),
        });

        // send accessToken and refreshToken
        console.log({
            refreshToken,
            accessToken,
        });
        res.status(200).json({
            success: true,
            refreshToken,
            accessToken,
        });
    } catch (err) {
        next(err);
    }
}
