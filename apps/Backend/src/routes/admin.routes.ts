import { Router } from "express";
import { requireAdmin } from "../middlewares/role.middleware.js";
import { createProductController } from "../controllers/product.controller.js";
import { apiRateLimiter } from "../middlewares/rateLimit.js";
const router = Router();


router.post('/product', apiRateLimiter, requireAdmin, createProductController)
export default router;