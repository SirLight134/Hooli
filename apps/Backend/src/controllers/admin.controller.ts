import { Request, Response } from "express";
import logger from "../utils/logger.js";
import User from "../models/User.model";
import Product from "../models/Product.model";
import Order from "../models/Order.model";


export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const [users, products, orders] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Order.countDocuments(),
        ]);
        res.json({ users, products, orders });
    } catch (error: any) {
        logger.error(error, "Failed to get dashboard stats");
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const query = User.find()
            .sort({ createdAt: -1 })
            .skip(Number(req.query.skip) || 0)
            .limit(Number(req.query.limit) || 10)

        const users = await query.exec()
        logger.info({ count: users.length }, 'User Found')
        res.status(200).json({ message: "User fetched successfully", users });

    } catch (error: any) {
        logger.error(error, 'Faiiled to fetch Users')
        res.status(500).json({ message: error.message });
    }
}

export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        logger.info({ userId: req.params.id }, 'User Role updated');
        res.status(200).json({ message: "User Role updated successfully" });

    } catch (error: any) {
        logger.error(error, 'Failed to update the User Role');
        res.status(500).json({ message: error.message });
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        logger.info({ userId: req.params.id }, 'User deleted');
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        logger.error(error, 'Failed to delete the User');
        res.status(500).json({ message: error.message });
    }
};
