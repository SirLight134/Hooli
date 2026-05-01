import { Request, Response } from "express";


export const createOrderController = (req: Request, res: Response) => {
    console.log("1.createOrderController");
    res.json({ message: 'Create order routes' });
};

export const cancelOrderController = (req: Request, res: Response) => {
    console.log("1.cancelOrderController");
    res.json({ message: 'Cancel order routes' });
};

export const getOrdersController = (req: Request, res: Response) => {
    console.log("1.getOrdersController");
    res.json({ message: 'Get orders routes' });
};

export const getOrderController = (req: Request, res: Response) => {
    console.log("1.getOrderController");
    res.json({ message: 'Get order routes' });
};

export const updateOrderController = (req: Request, res: Response) => {
    console.log("1.updateOrderController");
    res.json({ message: 'Update order routes' });
};

export const deleteOrderController = (req: Request, res: Response) => {
    console.log("1.deleteOrderController");
    res.json({ message: 'Delete order routes' });
};  