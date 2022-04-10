import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import status from "http-status";
import { zodErrorsFormatter } from "../utils/errors.utils";
import log from "../utils/logger.utils";

const validatorResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        log.info("[BODY]");
        log.info({ body: req.body });

        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        next();
    } catch (e: any) {
        let error: any = {
            message: "The submitted input is incorrect",
            status: status.BAD_REQUEST,
        };

        if (e instanceof ZodError) {
            error.data = zodErrorsFormatter(e);
        }

        next(error);
    }
};

export default validatorResource;
