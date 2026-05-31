import { rateLimit } from "express-rate-limit";
import logger from "../utils/logger.js";
import { NextFunction, Request, Response } from "express";

export const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later',
    handler: (req: Request, res: Response, next: NextFunction, options: any) => {
        logger.warn({ req }, options.message);
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts from this IP, please try again later',
    handler: (req: Request, res: Response, next: NextFunction, options: any) => {
        logger.warn({ req }, options.message);
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
});
