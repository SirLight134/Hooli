import { Request, Response, NextFunction } from "express";
import { authenticate } from "./auth.middleware.js";
import logger from "../utils/logger.js";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: "Not authorized to access this route. Admin role required." });
    }
    next();
};

export const isSeller = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'seller') {
        return res.status(403).json({ message: "Not authorized to access this route. Seller role required." });
    }
    next();
};

export const isBuyer = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'buyer') {
        return res.status(403).json({ message: "Not authorized to access this route. Buyer role required." });
    }
    next();
};

export const isBuyerOrSeller = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'buyer' && req.user?.role !== 'seller') {
        return res.status(403).json({ message: "Not authorized to access this route. Buyer or Seller role required." });
    }
    next();
};

export const hasAnyRole = (roles: Array<"user" | "admin" | "seller" | "buyer">) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role!)) {
            return res.status(403).json({ message: "Not authorized to access this route. Role required." });
        }
        logger.debug({ roles }, 'hasAnyRole middleware ran');
        next();
    }
};

export const requireAdmin = [authenticate, isAdmin];
export const requireSeller = [authenticate, isSeller];
export const requireBuyer = [authenticate, isBuyer];
export const requireBuyerOrSeller = [authenticate, isBuyerOrSeller];
