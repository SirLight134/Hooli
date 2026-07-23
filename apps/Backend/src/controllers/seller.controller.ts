import User from "../models/User.model";
import logger from "../utils/logger.js";
import type { Request, Response } from "express";
import Product from "../models/Product.model";
import Order from "../models/Order.model";

export const getSellerProducts = async (req: Request, res: Response) => {
    try {
        const products = await User.findById(req.params.id).populate("products")
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        logger.error({ error }, 'Failed to fetch products');
        res.status(500).json({ message });
    }
}

export const getSellerDashboardStats = async (req: Request, res: Response) => {
    try {
        const seller = await User.findById(req.params.id);
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }
        const [products, orders] = await Promise.all([
            Product.countDocuments(),
            Order.countDocuments(),
        ]);
        res.json({ products, orders });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        logger.error({ error }, 'Failed to get dashboard stats');
        res.status(500).json({ message });
    }
};


export const getSellerOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ seller: req.params.id })
        res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        logger.error({ error }, 'Failed to fetch orders');
        res.status(500).json({ message });
    }
};

export const updateSellerOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        logger.info({ orderId: req.params.id }, 'Order updated');
        res.status(200).json({ message: "Order updated successfully" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        logger.error({ error }, 'Failed to update order');
        res.status(500).json({ message });
    }
};