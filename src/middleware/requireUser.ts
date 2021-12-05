import { NextFunction, Request, Response } from "express";
import status from "http-status";

function requireUser(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;

    if (user) return next();

    res.status(status.UNAUTHORIZED).json({
        messgae: " Unauthorized",
        status: status.UNAUTHORIZED,
    });
}

export default requireUser;
