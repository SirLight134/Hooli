import { IUser } from "../models/User.model.js";
import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export interface AuthRequest extends Request {
    user: IUser;
}