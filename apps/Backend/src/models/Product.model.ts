import mongoose, { Schema, Document } from "mongoose";
import { productSchema } from "../../../../packages/shared/dist";

export interface IProduct extends Document {
    name: string;
    description: string;
    images: string[];
    price: number;
    discount: number;
    category: string;
    stock: number;
    brand: string;
    seller: mongoose.Types.ObjectId;
    tags: string[];

}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [String],
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String], default: [] },
}
    , {
        timestamps: true
    }
);

ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ seller: 1 });
ProductSchema.index({ createdAt: 1 })


ProductSchema.virtual("discountedPrice").get(function (this: IProduct) {
    return this.price * (1 - this.discount / 100);
})

ProductSchema.virtual("inStock").get(function (this: IProduct) {
    return this.stock > 0;
})
export default mongoose.model<IProduct>("Product", ProductSchema);
