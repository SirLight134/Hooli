import { Router } from "express";
import { loginController, registerController, logoutController, refreshController, meController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { authRateLimiter, apiRateLimiter } from "../middlewares/rateLimit.js";
import { createUserSchema, loginSchema, registerSchema } from "@hooli/shared";


const router = Router();

/**
 * @swagger
 * /auth/login:
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
 * /auth/logout:
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
 * /auth/register:
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
 * /auth/refresh:
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
 * /auth/me:
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