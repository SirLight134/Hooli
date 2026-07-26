import { Router } from "express";
import { getProductsController } from "../controllers/product.controller";
import { getProductControllerById } from "../controllers/product.controller";
import { createProductController } from "../controllers/product.controller";
import { updateProductController } from "../controllers/product.controller";
import { deleteProductController } from "../controllers/product.controller";
import { requireSeller, requireBuyerOrSeller } from "../middlewares/role.middleware";
import { isOwner } from "../middlewares/owner.middleware";
import { validate } from "../middlewares/validate.js";
import { createProductSchema, productSchema } from "@hooli/shared";
import { apiRateLimiter } from "../middlewares/rateLimit.js";

const router = Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
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
 *         description: Forbidden - seller role required
 */
router.post("/", apiRateLimiter, requireSeller, validate(createProductSchema, 'body'), createProductController)
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (public)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
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
 *         description: Products fetched successfully
 */
router.get("/", apiRateLimiter, getProductsController)
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID (public)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */
router.get("/:id", apiRateLimiter, getProductControllerById)
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - seller role required
 *       404:
 *         description: Product not found
 */
router.put("/:id", apiRateLimiter, requireSeller, validate(productSchema.partial(), 'body'), isOwner, updateProductController)
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - seller role required
 *       404:
 *         description: Product not found
 */
router.delete("/:id", apiRateLimiter, requireSeller, isOwner, deleteProductController)


export default router;
