import { Router } from "express";
import { loginController, registerController, logoutController, refreshController } from "../controllers/auth.controller";
const router = Router();

router.post('/login', loginController)
router.post('/logout', logoutController)
router.post('/register', registerController)
router.post('/refresh', refreshController)


export default router;