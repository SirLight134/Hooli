
export type Cart = {
    userId: string;
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

export type CartItem = {
    productId: string;
    quantity: number;
}

export type CartSummary = {
    totalItems: number;
    totalPrice: number;
}
