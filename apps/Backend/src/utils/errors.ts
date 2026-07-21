export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const validationError = (message: string) => new AppError(message, 400);
export const notFoundError = (message: string) => new AppError(message, 404);
export const unauthorizedError = (message: string) => new AppError(message, 401);
