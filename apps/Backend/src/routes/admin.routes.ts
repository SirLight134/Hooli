import { Router } from "express";
import { requireAdmin } from "../middlewares/role.middleware.js";
import { createProductController } from "../controllers/product.controller.js";

const router = Router();


router.post('/product', requireAdmin, createProductController)
export default router;