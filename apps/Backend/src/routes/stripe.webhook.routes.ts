import { Router } from "express";

import { webhookController } from "../controllers/stripe.controller";


const router = Router();


router.post('/webhook', webhookController)


export default router;
