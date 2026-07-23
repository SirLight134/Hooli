import express from "express";
import { upload } from "../middlewares/upload.js";
import { uploadSingleImage, uploadMultipleImages, deleteCloudinaryImage } from "../controllers/upload.controller.js";





const router = express.Router();

router.post("/single", upload.single("image"), uploadSingleImage);
router.post("/multiple", upload.array("images", 10), uploadMultipleImages);
router.delete("/:imageUrl", deleteCloudinaryImage);
export default router;
