import { Router } from "express";
import { getProductsController } from "../controllers/product.controller";
import { getProductControllerById } from "../controllers/product.controller";
import { createProductController } from "../controllers/product.controller";
import { updateProductController } from "../controllers/product.controller";
import { deleteProductController } from "../controllers/product.controller";
import { requireSeller, requireAdmin, requireBuyer, requireBuyerOrSeller } from "../middlewares/role.middleware";
import { isOwner } from "../middlewares/owner.middleware";
const router = Router();

router.post("/products", requireSeller, createProductController)
router.get("/products", requireBuyerOrSeller, getProductsController)
router.get("/products/:id", requireBuyerOrSeller, getProductControllerById)
router.put("/products/:id", requireSeller, isOwner, updateProductController)
router.delete("/products/:id", requireSeller, isOwner, deleteProductController)


export default router;
