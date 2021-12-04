import { DocumentDefinition } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";

export async function createProduct(input: DocumentDefinition<Omit<ProductDocument, "createAt | updateAt">>) {
    try {
        const product = await ProductModel.create(input);

        return product;
    } catch (err) {
        throw err;
    }
}
