import { Request, Response } from "express";
import logger from "../utils/logger.js";


export const createOrderController = (req: Request, res: Response) => {
    logger.debug('Create order endpoint called');
    res.json({ message: 'Create order routes' });
};

export const cancelOrderController = (req: Request, res: Response) => {
    logger.debug('Cancel order endpoint called');
    res.json({ message: 'Cancel order routes' });
};

export const getOrdersController = (req: Request, res: Response) => {
    logger.debug('Get orders endpoint called');
    res.json({ message: 'Get orders routes' });
};

export const getOrderController = (req: Request, res: Response) => {
    logger.debug('Get order endpoint called');
    res.json({ message: 'Get order routes' });
};

export const updateOrderController = (req: Request, res: Response) => {
    logger.debug('Update order endpoint called');
    res.json({ message: 'Update order routes' });
};

export const deleteOrderController = (req: Request, res: Response) => {
    logger.debug('Delete order endpoint called');
    res.json({ message: 'Delete order routes' });
};  