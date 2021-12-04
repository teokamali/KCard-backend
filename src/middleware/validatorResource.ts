import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { zodErrorsFormatter } from "../utils/errors.utils";

const validatorResource =
    (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("[BODY]",req.body)
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });

            next();
        } catch (e: any) {
            let error: any = {
                message: "The submitted information is incorrect",
                status: 409,
            };

            if (e instanceof ZodError) {
                error.data = zodErrorsFormatter(e);
            }

            next(error);
        }
    };

export default validatorResource;
