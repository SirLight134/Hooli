import { Request, Response, NextFunction } from "express";
import { registerService, loginService, refreshService, logoutService } from "../services/auth.service.js";


export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await loginService(email, password);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role } = req.body;
        const result = await registerService({ name, email, password, role });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const refreshController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        const result = await refreshService(userId!);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        const result = await logoutService(userId!);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const meController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};
