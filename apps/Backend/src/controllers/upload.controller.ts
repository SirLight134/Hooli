import type { Request, Response } from "express";
import path from "path";
import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadSingleImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "hooli/uploads",
        });

        // Delete from local storage
        fs.unlinkSync(req.file.path);

        res.json({ url: result.secure_url });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: "Upload failed" });
    }
};

export const uploadMultipleImages = async (req: Request, res: Response) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Upload all files to Cloudinary
        const uploadPromises = (req.files as Express.Multer.File[]).map((file) =>
            cloudinary.uploader.upload(file.path, {
                folder: "hooli/uploads",
            })
        );

        const results = await Promise.all(uploadPromises);

        // Delete all files from local storage
        (req.files as Express.Multer.File[]).forEach((file) =>
            fs.unlinkSync(file.path)
        );

        res.json({ urls: results.map((r) => r.secure_url) });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: "Upload failed" });
    }
};

// Delete cloudinary image when deleting a user or product
export const deleteCloudinaryImage = async (req: Request, res: Response) => {
    try {
        const imageUrl = decodeURIComponent(req.params.imageUrl);
        const publicId = imageUrl
            .split("/hooli/uploads/")[1]
            .split(".")[0];
        await cloudinary.uploader.destroy(`hooli/uploads/${publicId}`);
        res.json({ message: 'Image deleted' });
    } catch (err) {
        console.error("Error deleting image from Cloudinary:", err);
        res.status(500).json({ message: 'Deletion failed' });
    }
};