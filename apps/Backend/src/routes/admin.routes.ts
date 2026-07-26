import { Router } from "express";
import { requireAdmin } from "../middlewares/role.middleware.js";
import { createProductController } from "../controllers/product.controller.js";
import { deleteUser, getDashboardStats, getAllUsers, updateUserRole } from '../controllers/admin.controller.js'
import { apiRateLimiter } from "../middlewares/rateLimit.js";
import { createProductSchema } from "@hooli/shared";

const router = Router();

/**
 * @swagger
 * /api/admin/product:
 *   post:
 *     summary: Create a new product (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin role required
 */
router.post('/product', apiRateLimiter, requireAdmin, createProductController)
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (admin dashboard)
 *     tags: [Admin]
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
 *         description: Users fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin role required
 */
router.get("/users", apiRateLimiter, requireAdmin, getAllUsers)
/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Update user role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [buyer, seller, admin]
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin role required
 *       404:
 *         description: User not found
 */
router.put('/:id', apiRateLimiter, requireAdmin, updateUserRole)
/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin role required
 *       404:
 *         description: User not found
 */
router.delete('/:id', apiRateLimiter, requireAdmin, deleteUser)








export default router;