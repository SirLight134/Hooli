import { Router } from "express";

import { webhookController } from "../controllers/stripe.controller";


const router = Router();


router.post('/api/webhook/stripe', webhookController)


export default router;
