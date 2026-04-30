import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util.js";
import User, { IUser } from "../models/User.model.js";

// Extend Express Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;

        // Extract token from Bearer header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized to access this route. No token provided." });
        }

        // Verify token
        const decoded = verifyToken<{ id: string }>(token);

        // Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ message: "The user belonging to this token does no longer exist." });
        }

        // Attach user to request object
        req.user = currentUser;
        next();
    } catch (error: any) {
        return res.status(401).json({ message: "Not authorized to access this route. Invalid or expired token." });
    }
};
