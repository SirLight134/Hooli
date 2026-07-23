import { Request, Response } from "express";
import { createCheckoutSession } from "../services/stripe.service";
import Product from "../models/Product.model";
import logger from "../utils/logger.js";
import { createOrderService } from "../services/order.service.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const webhookController = async (req: Request, res: Response) => {
    try {
        const sig = req.headers["stripe-signature"];
        if (!sig) return res.status(400).send("Missing signature");

        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
        switch (event.type) {
            case "checkout.session.completed":
                const checkoutSession = event.data.object as Stripe.Checkout.Session;
                const lineItems = await stripe.checkout.sessions.listLineItems(checkoutSession.id);
                await createOrderService(checkoutSession, lineItems.data);
                logger.info(`Order created for session: ${checkoutSession.id}`);
                res.status(200).json({ message: "Order created successfully" });
                break;
            default:
                logger.debug(`Event type: ${event.type} data: ${event.data.object}`);
                res.status(200).json({ message: `Event type: ${event.type}` });
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        logger.error({ error }, 'Failed to process webhook');
        res.status(500).json({ message: 'Failed to process webhook' });
    }



};


export const createCheckoutSessionController = async (req: Request, res: Response) => {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "No products found" });
    }

    try {

        const session = await createCheckoutSession(products, req.body.orderId, req.body.userId);
        return res.json({ url: session.url, sessionId: session.id });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        logger.error({ error }, 'Failed to create checkout session');
        return res.status(500).json({ message });
    }





};