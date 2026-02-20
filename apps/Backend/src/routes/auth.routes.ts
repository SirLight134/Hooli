import { Router } from "express";
import { Request, Response } from "express";
import { loginController } from "../controllers/auth.controller";
import { logoutController } from "../controllers/auth.controller";
import { registerController } from "../controllers/auth.controller";
const router = Router();

router.post('/login', loginController)
router.post('/logout', logoutController)
router.post('/register', registerController)


export default router;