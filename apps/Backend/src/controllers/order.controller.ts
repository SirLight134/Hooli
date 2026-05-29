import { Request, Response } from "express";
import logger from "../utils/logger.js";
import Order from "../models/Order.model.js";
import { createOrderService, updateOrderStatusService } from "../services/order.service.js";

export const createOrderController = async (checkoutSession: any, lineItems: any[]) => {
    await createOrderService(checkoutSession, lineItems);
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

export const updateOrderController = async (req: Request, res: Response) => {
    logger.debug('Update order endpoint called');
    await updateOrderStatusService(req.params.id, req.body.status);
    res.json({ message: 'Update order routes' });
};

export const deleteOrderController = (req: Request, res: Response) => {
    logger.debug('Delete order endpoint called');
    res.json({ message: 'Delete order routes' });
};

