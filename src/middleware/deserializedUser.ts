import { NextFunction, Response, Request } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/user.service";
import { verfyJwt } from "../utils/jwt.utils";

async function deserializedUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = get(req, "headers.x-refresh");

    if (!accessToken) return next();

    const { decoded, expired } = verfyJwt(accessToken);

    if (decoded) {
        //! session must be check before set user in res.locals

        res.locals.user = decoded;
        return next();
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken });

        if (!newAccessToken) return next();

        const result = verfyJwt(newAccessToken);

        // set new access token
        res.setHeader("x-access-token", newAccessToken);

        // set user
        res.locals.user = result.decoded;
    }
    next();
}
export default deserializedUser;
