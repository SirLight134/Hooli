import { z } from "zod";


export const productSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    price: z.number(),
    stock: z.number(),
    images: z.array(z.string()).optional(),
    seller: z.string(),
    category: z.string().optional(),
    slug: z.string().optional(),
})

export type Product = z.infer<typeof productSchema>

export const createProductSchema = productSchema.omit({
    seller: true,
    slug: true,
})

export type CreateProductInput = z.infer<typeof createProductSchema>
