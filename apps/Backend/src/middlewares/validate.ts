import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import { z as ZodSchema } from 'zod';


type RequestType = 'body' | 'query' | 'params';

export const validate = (schema: ZodSchema.ZodTypeAny, type: RequestType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[type]);
        if (result.success) {
            (req as any)[type] = result.data;
            next();
        } else {
            const formattedErrors = result.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
            }));
            logger.error({ errors: formattedErrors }, 'Validation failed');
            return res.status(400).json({ errors: formattedErrors, success: false, message: 'Validation failed' });
        }
    };
};