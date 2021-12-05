import { number, object, string, TypeOf } from "zod";

const payload = {
    body: object({
        title: string({
            required_error: "title is require",
        }),
        description: string({
            required_error: "description is require",
        }).min(120, "description too short -- description must be 120 chars or more"),
        price: number({
            required_error: "price is require",
        }),
        image: string({
            required_error: "image is require",
        }),
    }),
};

const params = {
    params: object({
        productId: string({
            required_error: "productId is require",
        }),
    }),
};

export const createProductSchema = object({
    ...payload,
});

export const getProductSchema = object({
    ...params,
});

export const updateProductSchema = object({
    ...payload,
    ...params,
});

export const deleteProductSchema = object({
    ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type ReadProductInput =  TypeOf<typeof getProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
