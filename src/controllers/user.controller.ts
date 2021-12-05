import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import status from "http-status";
import { createUserInput } from "../schema/user.schema";
import { createUser, findUser } from "../service/user.service";

export async function createUserHandler(
    req: Request<{}, {}, createUserInput["body"]>,
    res: Response,
    next: NextFunction
) {
    try {
        // check user is exist
        const isUserExist = await findUser({ email: req.body.email });

        if (isUserExist) {
            throw {
                message: "duplicate user",
                status: status.BAD_REQUEST,
            };
        }

        // create new user
        const user = await createUser(req.body);
        
        // send user's data
        res.status(status.OK).json({
            success: true,
            user: omit(user.toJSON(), "password"),
        });
    } catch (err: any) {
        next(err);
    }
}
