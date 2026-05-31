import mongoose from "mongoose";
import Order from "../models/Order.model.js";
import logger from "../utils/logger.js";
import { OrderStatus } from "@hooli/shared";
import Product from "../models/Product.model.js";

export const createOrderService = async (checkoutSession: any, lineItems: any[]) => {
    try {
        const existingOrder = await Order.findOne({ stripeSessionId: checkoutSession.id });
        if (existingOrder) {
            logger.info({ orderId: existingOrder._id }, 'Order already exists');
            return;
        }

        const { order_id: orderId, user_id: userId, products: productsMeta } = checkoutSession.metadata || {};
        const totalAmount = checkoutSession.amount_total / 100;

        let items: Array<{ productId: string; quantity: number; price?: number }> = [];
        if (productsMeta) {
            try {
                items = JSON.parse(productsMeta);
            } catch (err) {
                logger.error(err, 'Failed to parse products metadata JSON');
            }
        }

        // Fallback to lineItems if metadata is missing or empty
        if (!items || items.length === 0) {
            items = lineItems.map((item: any) => ({
                productId: item.price.product,
                quantity: item.quantity,
                price: item.price.unit_amount / 100,
            }));
        }

        // Build lineItems price lookup for fallback
        const lineItemPriceMap: Record<string, number> = {};
        for (const li of lineItems) {
            const pid = li.price.product;
            lineItemPriceMap[pid] = li.price.unit_amount / 100;
        }

        const productsList: any[] = [];
        if (items.length > 0) {
            for (const item of items) {
                const isObjectId = mongoose.Types.ObjectId.isValid(item.productId);
                let product = null;
                if (isObjectId) {
                    product = await Product.findById(item.productId);
                }

                if (!product) {
                    const linePrice = lineItemPriceMap[item.productId];
                    const fallbackPrice = item.price || linePrice || 0;
                    logger.warn({ productId: item.productId, price: fallbackPrice }, 'Product not found in DB, storing without reference');
                    productsList.push({
                        product: new mongoose.Types.ObjectId(),
                        quantity: item.quantity,
                        priceAtPurchase: fallbackPrice,
                    });
                    continue;
                }

                if (product.stock < item.quantity) {
                    logger.error({ productId: item.productId }, 'Product is out of stock');
                    continue;
                }
                product.stock -= item.quantity;
                await product.save();
                logger.info({ productId: item.productId }, 'Product stock updated');

                productsList.push({
                    product: product._id,
                    quantity: item.quantity,
                    priceAtPurchase: item.price || product.price,
                });
            }
        }

        const shippingDetails = checkoutSession.shipping_details;
        const shippingAddress = {
            street: shippingDetails?.address?.line1 || "Unknown Street",
            city: shippingDetails?.address?.city || "Unknown City",
            country: shippingDetails?.address?.country || "Unknown Country",
            zipCode: shippingDetails?.address?.postal_code || "00000",
        };

        const newOrder = await Order.create({
            stripeSessionId: checkoutSession.id,
            buyer: mongoose.Types.ObjectId.isValid(userId) ? userId : new mongoose.Types.ObjectId(),
            total: totalAmount,
            status: OrderStatus.PAID,
            products: productsList,
            shippingAddress,
        });

        logger.info({ orderId: newOrder._id }, 'Order created successfully');
        return newOrder;
    }
    catch (error) {
        logger.error(error, 'Failed to create order');
        throw error;
    }
};


export const updateOrderStatusService = async (orderId: string, status: OrderStatus) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            logger.error({ orderId }, 'Order not found');
            throw new Error(`Order not found: ${orderId}`);
        }
        order.status = status;
        await order.save();
        logger.info({ order }, 'Order status updated');
        return order;
    } catch (error) {
        logger.error(error, 'Failed to update order status');
        throw error;
    }
}