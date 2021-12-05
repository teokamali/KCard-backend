import { Request, Response, NextFunction } from "express";
import status from "http-status";
function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // log.info(err);

    const error = {
        status: err.status,
        message: err.message,
        data: err.data,
    };

    res.status(error.status || status.INTERNAL_SERVER_ERROR).json(error);
}

export default errorHandler;
