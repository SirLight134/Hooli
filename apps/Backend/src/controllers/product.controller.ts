import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

export const getProductsController = (req: Request, res: Response) => {
    res.json({ message: 'Products routes' });
};

export const getProductController = (req: Request, res: Response) => {
    res.json({ message: 'Product routes' });
};

export const createProductController = (req: Request, res: Response) => {
    res.json({ message: 'Create product routes' });
};

export const updateProductController = (req: Request, res: Response) => {
    res.json({ message: 'Update product routes' });
};

export const deleteProductController = (req: Request, res: Response) => {
    res.json({ message: 'Delete product routes' });
};  

export default router;