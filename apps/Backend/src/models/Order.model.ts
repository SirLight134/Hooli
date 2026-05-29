import mongoose, { Schema, model } from "mongoose";

import { OrderStatus } from "@hooli/shared";

export interface IOrder {
    products: mongoose.Types.ObjectId[];
}


const OrderSchema = new Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            quantity: { type: Number, default: 1 },
            priceAtPurchase: { type: Number, required: true },
        }
    ],
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    stripeSessionId: { type: String, required: true, unique: true },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
    }
}, {
    timestamps: true
})

export default model("Order", OrderSchema);