import { OrderStatus, Address, OrderItem } from '@hooli/shared';

/**
 * Input payload for creating a new order via API/controller
 */
export interface CreateOrderInput {
    items: Array<{
        productId: string;
        quantity: number;
    }>;
    shippingAddress: Address;
    notes?: string;
}

/**
 * Query parameters for filtering and paginating orders
 */
export interface OrderFilter {
    status?: OrderStatus;
    buyerId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'totalAmount';
    sortOrder?: 'asc' | 'desc';
}

/**
 * Populated order item with product details for API response
 */
export interface PopulatedOrderItem {
    product: {
        id: string;
        name: string;
        price: number;
        image?: string;
    };
    quantity: number;
    priceAtPurchase: number;
}

/**
 * Full order response structure returned by API controllers
 */
export interface OrderResponse {
    id: string;
    buyerId: string;
    items: PopulatedOrderItem[];
    totalAmount: number;
    status: OrderStatus;
    shippingAddress: Address;
    stripeSessionId?: string;
    createdAt: string;
    updatedAt: string;
}
