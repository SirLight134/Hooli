import { Request, Response } from "express";




export const loginController = (req: Request, res: Response) => {
    res.json({ message: 'Login routes' });
};

export const logoutController = (req: Request, res: Response) => {
    res.json({ message: 'Logout routes' });
};

export const registerController = (req: Request, res: Response) => {
    res.json({ message: 'Register routes' });
};