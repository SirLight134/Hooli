import { Request,Response } from "express";


export const WeebhookController = (req: Request, res: Response) => {
    res.json({ message: 'Webhook routes' });
};