import { Router } from "express";
import { requireAdmin } from "../middlewares/role.middleware.js";
import { createProductController } from "../controllers/product.controller.js";
import { deleteUser, getDashboardStats, getAllUsers, updateUserRole } from '../controllers/admin.controller.js'
import { apiRateLimiter } from "../middlewares/rateLimit.js";
const router = Router();


router.post('/product', apiRateLimiter, requireAdmin, createProductController)
router.get('/dashboard', apiRateLimiter, requireAdmin, getDashboardStats)
router.get("/users", apiRateLimiter, requireAdmin, getAllUsers)
router.put('/:id', apiRateLimiter, requireAdmin, updateUserRole)
router.delete('/:id', apiRateLimiter, requireAdmin, deleteUser)











export default router;