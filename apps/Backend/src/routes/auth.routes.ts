import { Router } from "express";
import { loginController, registerController, logoutController, refreshController, meController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { authRateLimiter, apiRateLimiter } from "../middlewares/rateLimit.js";
import { createUserSchema, loginSchema, registerSchema } from "@hooli/shared";


const router = Router();

router.post('/login', authRateLimiter, validate(loginSchema, 'body'), loginController)
router.post('/logout', authenticate, logoutController)
router.post('/register', authRateLimiter, validate(registerSchema, 'body'), registerController)
router.post('/refresh', apiRateLimiter, authenticate, refreshController)
router.get('/me', authenticate, meController)


export default router;