import { Request, Response } from "express";
import { Router } from "express";

const router = Router();

router.get('/admin', (req: Request, res: Response) => {
    res.json({ message: 'Admin routes' });
});

export default router;