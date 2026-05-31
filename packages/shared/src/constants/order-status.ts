export const OrderStatus = {
    PENDING: "PENDING",
    PAID: "PAID",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
    PROCESSING: "PROCESSING",
} as const


export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const OrderStatusValues = Object.values(OrderStatus)