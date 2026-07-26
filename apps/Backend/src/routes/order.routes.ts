import { Router } from "express";
import { createOrderController } from "../controllers/order.controller";
import { cancelOrderController } from "../controllers/order.controller";
import { getOrdersController } from "../controllers/order.controller";
import { getOrderController } from "../controllers/order.controller";
import { updateOrderController } from "../controllers/order.controller";
import { deleteOrderController } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireBuyer, requireAdmin, hasAnyRole, requireBuyerOrSeller } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema, orderSchema } from "@hooli/shared";
import { apiRateLimiter } from "../middlewares/rateLimit.js";

const router = Router();

/**
 * @swagger
 * /api/orders/create-order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderInput'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - buyer role required
 */
router.post('/create-order', apiRateLimiter, validate(createOrderSchema, 'body'), requireBuyer, createOrderController)

/**
 * @swagger
 * /api/orders/cancel-order:
 *   post:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */
router.post('/cancel-order', apiRateLimiter, requireBuyerOrSeller, cancelOrderController)

/**
 * @swagger
 * /api/orders/:
 *   get:
 *     summary: Get all orders (authenticated)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by order status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
router.get('/', apiRateLimiter, authenticate, getOrdersController)
/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderInput'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */
router.put('/:id', apiRateLimiter, validate(orderSchema.partial(), 'body'), requireBuyer, updateOrderController)
/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */
router.delete('/:id', apiRateLimiter, [authenticate, hasAnyRole(['admin', 'seller'])], deleteOrderController)


export default router;