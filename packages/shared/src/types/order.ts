

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    PAID = 'PAID',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export type OrderItem = {
    productId: string;
    quantity: number;
    price: number;
}

export type Order = {
    buyerId: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    stripeSessionId: string;
    shippingAddress: Address;

}

export type Address = {
    street: string;
    city: string;
    country: string;
    zipCode: string;
}

