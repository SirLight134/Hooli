import { Router } from "express";
import { createCheckoutSessionController } from "../controllers/stripe.controller";

const router = Router();


router.post('/create-checkout-session', createCheckoutSessionController)

export default router;