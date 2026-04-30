import { Request, Response } from "express";

import { registerService, loginService, refreshService, logoutService } from "../services/auth.service.js";


export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginService(email, password);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const result = await registerService({ name, email, password });
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const refreshController = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const result = await refreshService(userId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const logoutController = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const result = await logoutService(userId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
