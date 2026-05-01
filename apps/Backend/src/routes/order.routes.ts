import { Router } from "express";
import { createOrderController } from "../controllers/order.controller";
import { cancelOrderController } from "../controllers/order.controller";
import { getOrdersController } from "../controllers/order.controller";
import { getOrderController } from "../controllers/order.controller";
import { updateOrderController } from "../controllers/order.controller";
import { deleteOrderController } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireBuyer, isBuyerOrSeller, requireAdmin, requireSeller, hasAnyRole, requireBuyerOrSeller } from "../middlewares/role.middleware.js";
const router = Router();

router.post('/create-order', requireBuyer, createOrderController)
router.post('/cancel-order', requireBuyerOrSeller, cancelOrderController)
router.get('/orders', requireAdmin, getOrdersController)
router.get('/orders/:id', authenticate, getOrderController)
router.put('/orders/:id', requireBuyer, updateOrderController)
router.delete('/orders/:id', [authenticate, hasAnyRole(['admin', 'seller'])], deleteOrderController)


export default router;