import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import { AppError, notFoundError } from "../utils/errors.js";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        logger.error({ error, path: req.path, method: req.method, statusCode: error.statusCode }, error.message);
        return res.status(error.statusCode).json({
            message: error.message,
            status: error.status,
            isOperational: error.isOperational,
        });
    }
    logger.error({ error, path: req.path, method: req.method }, 'Unhandled error');
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });

};


export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = notFoundError(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

