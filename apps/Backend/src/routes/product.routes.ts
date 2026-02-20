import { Router } from "express";
import { getProductsController } from "../controllers/product.controller";
import { getProductController } from "../controllers/product.controller";
import { createProductController } from "../controllers/product.controller";
import { updateProductController } from "../controllers/product.controller";
import { deleteProductController } from "../controllers/product.controller";

const router = Router();

router.get('/products', getProductsController)
router.get('/products/:id', getProductController)
router.post('/products', createProductController)
router.put('/products/:id', updateProductController)
router.delete('/products/:id', deleteProductController)

export default router;
