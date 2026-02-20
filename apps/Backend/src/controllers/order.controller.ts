import { Request, Response } from "express";


export const createOrderController = (req: Request, res: Response) => {
    res.json({ message: 'Create order routes' });
};

export const cancelOrderController = (req: Request, res: Response) => {
    res.json({ message: 'Cancel order routes' });
};

export const getOrdersController = (req: Request, res: Response) => {
    res.json({ message: 'Get orders routes' });
};

export const getOrderController = (req: Request, res: Response) => {
    res.json({ message: 'Get order routes' });
};

export const updateOrderController = (req: Request, res: Response) => {
    res.json({ message: 'Update order routes' });
};

export const deleteOrderController = (req: Request, res: Response) => {
    res.json({ message: 'Delete order routes' });
};  