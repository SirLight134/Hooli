import { Router } from "express";
import { requireSeller } from "../middlewares/role.middleware.js";
import { getSellerProducts, getSellerDashboardStats, getSellerOrders, updateSellerOrder } from "../controllers/seller.controller.js";
import { apiRateLimiter } from "../middlewares/rateLimit.js";
import { validate } from "../middlewares/validate.js";
import { updateProductSchema } from "@hooli/shared";

const router = Router();
router.get("/dashboard", apiRateLimiter, requireSeller, getSellerDashboardStats);
router.get("/products", apiRateLimiter, requireSeller, getSellerProducts);
router.get("/orders", apiRateLimiter, requireSeller, getSellerOrders);
router.put("/orders/:id", apiRateLimiter, validate(updateProductSchema.partial(), 'body'), requireSeller, updateSellerOrder);

export default router;