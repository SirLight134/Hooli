import { z } from "zod";
import { OrderStatus } from "../types/order";

export const addressSchema = z.object({
    street: z.string().min(3),
    city: z.string().min(3),
    country: z.string().min(3),
    zipCode: z.string().min(3),
})

export const orderItemSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
    price: z.number(),
})

export const orderSchema = z.object({
    buyerId: z.string(),
    items: z.array(orderItemSchema),
    total: z.number(),
    status: z.nativeEnum(OrderStatus),
    stripeSessionId: z.string(),
    shippingAddress: addressSchema,
})


export type Address = z.infer<typeof addressSchema>
export type OrderItem = z.infer<typeof orderItemSchema>
export type Order = z.infer<typeof orderSchema>


export const createOrderSchema = orderSchema.omit({
    buyerId: true,
    status: true,
    stripeSessionId: true,
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
