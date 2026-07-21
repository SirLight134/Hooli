import { Router } from "express";
import authRoutes from "./auth.routes";
import adminRoutes from "./admin.routes";
import orderRoutes from "./order.routes";
import productRoutes from './product.routes';
import stripeWebhookRoutes from './stripe.webhook.routes';


const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/order', orderRoutes);
router.use('/product', productRoutes);
router.use('/stripe-webhook', stripeWebhookRoutes);

export default router;