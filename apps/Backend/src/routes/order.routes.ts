import { Router } from "express";
import { createOrderController } from "../controllers/order.controller";
import { cancelOrderController } from "../controllers/order.controller";
import { getOrdersController } from "../controllers/order.controller";
import { getOrderController } from "../controllers/order.controller";
import { updateOrderController } from "../controllers/order.controller";
import { deleteOrderController } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireBuyer, requireAdmin, hasAnyRole, requireBuyerOrSeller } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema, orderSchema } from "@hooli/shared";
import { apiRateLimiter } from "../middlewares/rateLimit.js";

const router = Router();

router.post('/create-order', apiRateLimiter, validate(createOrderSchema, 'body'), requireBuyer, createOrderController)
router.post('/cancel-order', apiRateLimiter, requireBuyerOrSeller, cancelOrderController)
router.get('/', apiRateLimiter, authenticate, getOrdersController)
router.put('/:id', apiRateLimiter, validate(orderSchema.partial(), 'body'), requireBuyer, updateOrderController)
router.delete('/:id', apiRateLimiter, [authenticate, hasAnyRole(['admin', 'seller'])], deleteOrderController)


export default router;