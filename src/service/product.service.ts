import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument, ProductInput } from "../models/product.model";

export async function createProduct(input: ProductInput) {
    try {
        const result = await ProductModel.create(input);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function findProduct(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
    try {
        const result = await ProductModel.findOne(query, {}, options);

        return result;
    } catch (e) {
        throw e;
    }
}

export async function updateProduct(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options?: QueryOptions | undefined) {
    try {
        const result = await ProductModel.findOneAndUpdate(query, update, options);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
    try {
        const result = await ProductModel.deleteOne(query);

        return result;
    } catch (err) {
        throw err;
    }
}
