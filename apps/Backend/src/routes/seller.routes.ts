import { Router } from "express";
import { requireSeller } from "../middlewares/role.middleware.js";
import { getSellerProducts, getSellerDashboardStats, getSellerOrders, updateSellerOrder } from "../controllers/seller.controller.js";
import { apiRateLimiter } from "../middlewares/rateLimit.js";
import { validate } from "../middlewares/validate.js";
import { updateProductSchema } from "@hooli/shared";

const router = Router();
/**
 * @swagger
 * /seller/dashboard:
 *   get:
 *     summary: Get seller dashboard statistics
 *     tags: [Seller]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Seller dashboard statistics fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - seller role required
 */
router.get("/dashboard", apiRateLimiter, requireSeller, getSellerDashboardStats);
/**
 * @swagger
 * /seller/products:
 *   get:
 *     summary: Get seller products
 *     tags: [Seller]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Seller products fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - seller role required
 */
router.get("/products", apiRateLimiter, requireSeller, getSellerProducts);
/**
 * @swagger
 * /seller/orders:
 *   get:
 *     summary: Get seller orders
 *     tags: [Seller]
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
 *         description: Seller orders fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - seller role required
 */
router.get("/orders", apiRateLimiter, requireSeller, getSellerOrders);
/**
 * @swagger
 * /seller/orders/{id}:
 *   put:
 *     summary: Update seller order
 *     tags: [Seller]
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
 *         description: Seller order updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - seller role required
 *       404:
 *         description: Order not found
 */
router.put("/orders/:id", apiRateLimiter, validate(updateProductSchema.partial(), 'body'), requireSeller, updateSellerOrder);

export default router;