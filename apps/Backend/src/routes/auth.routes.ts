import { Router } from "express";
import { loginController, registerController, logoutController, refreshController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "@hooli/shared";
import { createUserSchema } from "@hooli/shared";
const router = Router();

router.post('/login', validate(loginSchema, 'body'), loginController)
router.post('/logout', authenticate, logoutController)
router.post('/register', validate(createUserSchema, 'body'), registerController)
router.post('/refresh', authenticate, refreshController)


export default router;  