import { Router } from "express";

import { WeebhookController } from "../controllers/stripe.controller";


const router = Router();


router.post('/api/webhook/stripe',WeebhookController)


export default router;
