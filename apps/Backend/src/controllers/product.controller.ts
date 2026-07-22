import { Request, Response } from "express";
import Product from "../models/Product.model";
import logger from "../utils/logger.js";

export const getProductsController = async (req: Request, res: Response) => {
    try {
        const query = Product.find()
            .sort({ createdAt: -1 })
            .skip(Number(req.query.skip) || 0)
            .limit(Number(req.query.limit) || 10)

        // Apply filters from queryq
        if (req.query.category) {
            query.where("category").equals(req.query.category);
        }

        if (req.query.brand) {
            query.where("brand").equals(req.query.brand);
        }
        if (req.query.minPrice) {
            query.where("price").gte(Number(req.query.minPrice));
        }
        if (req.query.maxPrice) {
            query.where("price").lte(Number(req.query.maxPrice));
        }

        const products = await query.exec();
        logger.info({ count: products.length }, 'Products fetched');
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error: any) {

        res.status(500).json({ message: error.message }); logger.error(error, 'Failed to fetch products');
    }
};

export const getProductControllerById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ message: "Product fetched successfully", product });
    } catch (error: any) {
        logger.error(error, 'Failed to fetch product');
        res.status(500).json({ message: error.message });
    }
};

export const createProductController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user as any;
        const product = await Product.create({ ...req.body, seller: _id });
        logger.info({ productId: product._id }, 'Product created');
        res.status(200).json({ message: "Product created successfully", product });
    } catch (error: any) {
        logger.error(error, 'Failed to create product');
        res.status(500).json({ message: error.message });
    }
};

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        logger.info({ productId: req.params.id }, 'Product updated');
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error: any) {
        logger.error(error, 'Failed to update product');
        res.status(500).json({ message: error.message });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        logger.info({ productId: req.params.id }, 'Product deleted');
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error: any) {
        logger.error(error, 'Failed to delete product');
        res.status(500).json({ message: error.message });
    }
};
