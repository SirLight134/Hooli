import { Router } from "express";
import { createCheckoutSessionController } from "../controllers/stripe.controller";

const router = Router();

/**
 * @swagger
 * /stripe/create-checkout-session:
 *   post:
 *     summary: Create a Stripe checkout session
 *     tags: [Stripe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCheckoutSessionInput'
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *       400:
 *         description: Bad request - invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/create-checkout-session', createCheckoutSessionController)

export default router;