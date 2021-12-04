import { NextFunction, Request, Response } from "express";

function requireUser(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;

    if (user) return next();

    res.status(401).json({
        messgae: " Unauthorized",
        status: 401,
    });
}

export default requireUser;
