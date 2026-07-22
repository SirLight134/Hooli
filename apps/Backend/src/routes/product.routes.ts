import { Router } from "express";
import { getProductsController } from "../controllers/product.controller";
import { getProductControllerById } from "../controllers/product.controller";
import { createProductController } from "../controllers/product.controller";
import { updateProductController } from "../controllers/product.controller";
import { deleteProductController } from "../controllers/product.controller";
import { requireSeller, requireBuyerOrSeller } from "../middlewares/role.middleware";
import { isOwner } from "../middlewares/owner.middleware";
import { validate } from "../middlewares/validate.js";
import { createProductSchema, productSchema } from "@hooli/shared";
import { apiRateLimiter } from "../middlewares/rateLimit.js";

const router = Router();

router.post("/", apiRateLimiter, requireSeller, validate(createProductSchema, 'body'), createProductController)
router.get("/", apiRateLimiter, requireBuyerOrSeller, getProductsController)
router.get("/:id", apiRateLimiter, requireBuyerOrSeller, getProductControllerById)
router.put("/:id", apiRateLimiter, requireSeller, validate(productSchema.partial(), 'body'), isOwner, updateProductController)
router.delete("/:id", apiRateLimiter, requireSeller, isOwner, deleteProductController)


export default router;
