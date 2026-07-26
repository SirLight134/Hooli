import { Router } from "express";
import { loginController, registerController, logoutController, refreshController, meController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { authRateLimiter, apiRateLimiter } from "../middlewares/rateLimit.js";
import { createUserSchema, loginSchema, registerSchema } from "@hooli/shared";


const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *     RegisterInput:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *         role:
 *           type: string
 *           enum: [buyer, seller]
 *     CreateProductInput:
 *       type: object
 *       required: [name, description, price, stock, brand]
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *         description:
 *           type: string
 *           minLength: 3
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *         brand:
 *           type: string
 *         discount:
 *           type: number
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *     UpdateProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *         brand:
 *           type: string
 *         discount:
 *           type: number
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *     CreateOrderInput:
 *       type: object
 *       required: [items, total, shippingAddress]
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *         total:
 *           type: number
 *         shippingAddress:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             country:
 *               type: string
 *             zipCode:
 *               type: string
 *     UpdateOrderInput:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [PENDING, PROCESSING, PAID, SHIPPED, DELIVERED, CANCELLED]
 *     CreateCheckoutSessionInput:
 *       type: object
 *       required: [products]
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authRateLimiter, validate(loginSchema, 'body'), loginController)


/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout from the system
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', authenticate, logoutController)
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email already exists
 */
router.post('/register', authRateLimiter, validate(registerSchema, 'body'), registerController)
/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.post('/refresh', apiRateLimiter, authenticate, refreshController)
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authenticate, meController)


export default router;