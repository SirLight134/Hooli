import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util.js";
import User, { IUser } from "../models/User.model.js";
import logger from "../utils/logger.js";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized to access this route. No token provided." });
        }

        const decoded = verifyToken<{ id: string }>(token);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ message: "The user belonging to this token does no longer exist." });
        }

        req.user = currentUser;
        logger.debug({ userId: currentUser._id }, 'Authenticated user');
        next();
    } catch (error: any) {
        return res.status(401).json({ message: "Not authorized to access this route. Invalid or expired token." });
    }
};
