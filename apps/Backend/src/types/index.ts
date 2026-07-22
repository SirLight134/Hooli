// Step 1: Re-export model interfaces
export type { IUser } from '../models/User.model.js';
export type { IProduct } from '../models/Product.model.js';
export type { IOrder } from '../models/Order.model.js';

// Step 2: Re-export custom request types
export type { AuthRequest } from './express.d.js';
export type * from './order.types.js';

// Step 3: Export backend utility types
export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export type AsyncHandler<T = void> = (
    ...args: any[]
) => Promise<T>;