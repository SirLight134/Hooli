import { z } from "zod";


export const cartItemSchema = z.object({
    productId: z.string().length(24, "Invalid product ID"),
    quantity: z.number().int().positive().min(1).max(100),
})

export const cartSchema = z.object({
    userId: z.string().length(24, "Invalid user ID"),
    items: z.array(cartItemSchema).min(1, "Cart must have at least one item"),
})

export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof cartSchema>

export const addToCartSchema = cartItemSchema;

export const updateCartItemSchema = cartItemSchema;