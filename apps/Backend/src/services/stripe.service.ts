import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
import Product, { IProduct } from "../models/Product.model";

export const createCheckoutSession = async (products: Array<{
    productId?: string;
    price_data: {
        currency: string;
        product_data: {
            name: string;
            images: string[];
        };
        unit_amount: number;
    };
    quantity: number;
}>,
    orderId: string,
    userId: string
) => {
    const productSummary = products.map((p) => {
        return `${p.price_data.product_data.name}: ${p.price_data.unit_amount / 100} * ${p.quantity}`;
    }).join(", ");


    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'GB', 'FR', 'DE', 'EG', 'SA', 'AE'],
        },
        line_items: products.map((item) => ({
            price_data: {
                currency: item.price_data.currency,
                product_data: {
                    name: item.price_data.product_data.name,
                    images: item.price_data.product_data.images,
                },
                unit_amount: item.price_data.unit_amount,
            },
            quantity: item.quantity,
        })),
        metadata: {
            order_id: orderId || "",
            user_id: userId || "",
            products: JSON.stringify(products.map(p => ({ productId: p.productId, quantity: p.quantity, price: p.price_data.unit_amount / 100 }))),
            summary: productSummary.substring(0, 500),
        },
        success_url: `${process.env.CLIENT_URL}/checkout?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cart?checkout=failed`,
        expires_at: Math.floor(Date.now() / 1000) + (30 * 60)
    });
    return session;

};

