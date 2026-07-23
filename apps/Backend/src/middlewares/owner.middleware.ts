import { Request, Response, NextFunction } from "express";
import Product from "../models/Product.model";
import logger from "../utils/logger.js";

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.user!;
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        if (product.seller.toString() !== _id.toString()) {
            return res.status(403).json({ message: "You are not the owner of this product" });
        }
        next();
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        logger.error({ error }, 'Owner check failed');
        res.status(500).json({ message });
    }
}