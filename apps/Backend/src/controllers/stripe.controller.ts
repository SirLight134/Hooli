import { Request, Response } from "express";
import { createCheckoutSession } from "../services/stripe.service";
import Product from "../models/Product.model";
import logger from "../utils/logger.js";




export const webhookController = (req: Request, res: Response) => {
    res.json({ message: 'Webhook routes' });
};


export const createCheckoutSessionController = async (req: Request, res: Response) => {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "No products found" });
    }

    try {

        const session = await createCheckoutSession(products, req.body.orderId, req.body.userId);
        return res.json({ url: session.url, sessionId: session.id });
    } catch (error: any) {
        logger.error(error, 'Failed to create checkout session');
        return res.status(500).json({ message: error.message });
    }





};