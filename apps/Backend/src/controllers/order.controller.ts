import { Request, Response } from "express";
import logger from "../utils/logger.js";
import Order from "../models/Order.model.js";
import { createOrderService, updateOrderStatusService } from "../services/order.service.js";
import { OrderStatus } from "@hooli/shared";

export const createOrderController = async (req: Request, res: Response) => {
    try {
        logger.debug('Create order endpoint called');
        const { items, shippingAddress } = req.body;
        const order = await Order.create({
            buyer: req.user!._id,
            products: items.map((i: any) => ({
                product: i.productId,
                quantity: i.quantity,
                priceAtPurchase: i.price,
            })),
            total: items.reduce((a: number, i: any) => a + i.price * i.quantity, 0),
            status: OrderStatus.PENDING,
            shippingAddress,
        });
        res.status(201).json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const cancelOrderController = async (req: Request, res: Response) => {
    try {
        logger.debug('Cancel order endpoint called');
        const order = await Order.findById(req.body.orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        order.status = OrderStatus.CANCELLED;
        await order.save();
        res.json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getOrdersController = async (req: Request, res: Response) => {
    try {
        logger.debug('Get orders endpoint called');
        const user = req.user!;
        const filter = user.role === 'admin' ? {} : { buyer: user._id };
        const orders = await Order.find(filter)
            .populate('products.product', 'name price images')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getOrderController = async (req: Request, res: Response) => {
    try {
        logger.debug('Get order endpoint called');
        const order = await Order.findById(req.params.id)
            .populate('products.product', 'name price images');
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        const user = req.user!;
        if (user.role !== 'admin' && order.buyer.toString() !== user._id.toString()) {
            res.status(403).json({ message: 'Not authorized' });
            return;
        }
        res.json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateOrderController = async (req: Request, res: Response) => {
    try {
        logger.debug('Update order endpoint called');
        const order = await updateOrderStatusService(req.params.id, req.body.status);
        res.json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOrderController = async (req: Request, res: Response) => {
    try {
        logger.debug('Delete order endpoint called');
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.json({ message: 'Order deleted' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

