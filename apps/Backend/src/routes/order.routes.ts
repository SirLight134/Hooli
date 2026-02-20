import { Router } from "express";
import { createOrderController } from "../controllers/order.controller";
import { cancelOrderController } from "../controllers/order.controller";
import { getOrdersController } from "../controllers/order.controller";
import { getOrderController } from "../controllers/order.controller";
import { updateOrderController } from "../controllers/order.controller";
import { deleteOrderController } from "../controllers/order.controller";
const router = Router();

router.post('/create-order', createOrderController)
router.post('/cancel-order', cancelOrderController)
router.get('/orders', getOrdersController)
router.get('/orders/:id', getOrderController)
router.put('/orders/:id', updateOrderController)
router.delete('/orders/:id', deleteOrderController)


export default router;