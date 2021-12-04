import { Request, Response, NextFunction } from "express";
import log from "../utils/logger.utils";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // log.info(err);
    
    const error = {
        status: err.status,
        message: err.message,
        data: err.data,
    };

    res.status(error.status || 500).json(error);
}

export default errorHandler;
