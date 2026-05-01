import { Router } from "express";
import { loginController, registerController, logoutController, refreshController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/login', loginController)
router.post('/logout', authenticate, logoutController)
router.post('/register', registerController)
router.post('/refresh', authenticate, refreshController)


export default router;