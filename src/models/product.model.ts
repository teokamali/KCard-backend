import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { number } from "zod";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ProductDocument extends mongoose.Document {
    user: UserDocument["_id"];
    productId: string;
    title: string;
    description: string;
    image: string;
    createAt: Date;
    updateAt: Date;
}

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        productId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(),
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
