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

        const { orderId, userId } = checkoutSession.metadata || { orderId: "", userId: "" };
        const totalAmount = checkoutSession.amount_total / 100;

        const items = lineItems.map((item: any) => ({
            productId: item.price.product,
            quantity: item.quantity,
            price: item.price.unit_amount / 100,
        }));

        const newOrder = await Order.create({
            stripeSessionId: checkoutSession.id,
            buyer: userId,
            total: totalAmount,
            status: OrderStatus.PAID,
        });

        logger.info({ orderId: newOrder._id }, 'Order created successfully');

        if (items.length > 0) {
            for (const item of items) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    logger.error({ productId: item.productId }, 'Product not found');
                    continue;
                }
                if (product.stock < item.quantity) {
                    logger.error({ productId: item.productId }, 'Product is out of stock');
                    continue;
                }
                product.stock -= item.quantity;
                await product.save();
                logger.info({ productId: item.productId }, 'Product stock updated');
            }
        }

        return newOrder;
    }
    catch (error) {
        logger.error(error, 'Failed to create order');
    }
};


export const updateOrderStatusService = async (orderId: string, status: OrderStatus) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            logger.error({ orderId }, 'Order not found');
            return;
        }
        order.status = status;
        await order.save();
        logger.info({ order }, 'Order status updated');
        return order;
    } catch (error) {
        logger.error(error, 'Failed to update order status');
    }
}