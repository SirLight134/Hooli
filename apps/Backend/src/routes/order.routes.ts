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
const router = Router();

router.post('/create-order', validate(createOrderSchema, 'body'), requireBuyer, createOrderController)
router.post('/cancel-order', requireBuyerOrSeller, cancelOrderController)
router.get('/orders', requireAdmin, getOrdersController)
router.get('/orders/:id', authenticate, getOrderController)
router.put('/orders/:id', validate(orderSchema.partial(), 'body'), requireBuyer, updateOrderController)
router.delete('/orders/:id', [authenticate, hasAnyRole(['admin', 'seller'])], deleteOrderController)


export default router;