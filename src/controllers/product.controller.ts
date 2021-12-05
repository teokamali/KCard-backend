import status from "http-status";
import { NextFunction, Request, Response } from "express";
import { CreateProductInput, DeleteProductInput, ReadProductInput, UpdateProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findProduct, updateProduct } from "../service/product.service";

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.user._id;
        const body = req.body;

        const product = await createProduct({ user: userId, ...body });

        res.status(status.OK).json({
            success: true,
            product,
        });
    } catch (err) {
        next(err);
    }
}

export async function getProductHandler(req: Request<ReadProductInput["params"]>, res: Response, next: NextFunction) {
    try {
        const { productId } = req.params;
        const product = await findProduct({ productId });

        if (!product) {
            throw {
                status: status.NOT_FOUND,
                message: "Product not found",
            };
        }

        res.status(status.OK).json({ success: true, product });
    } catch (err) {
        next(err);
    }
}
export async function updateProductHandler(req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>, res: Response, next: NextFunction) {
    try {
        const { user } = res.locals;
        const { productId } = req.params;
        const body = req.body;

        const product = await findProduct({ productId });

        if (!product) {
            throw {
                status: status.NOT_FOUND,
                message: "Product not found",
            };
        }

        if (user._id !== String(product.user)) {
            throw {
                status: status.FORBIDDEN,
                message: "access denied",
            };
        }

        const result = await updateProduct({ productId }, body);

        res.status(status.OK).json({
            success: true,
            ...result,
        });
    } catch (err) {
        next(err);
    }
}
export async function deleteProductHandler(req: Request<DeleteProductInput["params"]>, res: Response, next: NextFunction) {
    try {
        const { user } = res.locals;
        const { productId } = req.params;
        const product = await findProduct({ productId });

        if (!product) {
            throw {
                status: status.NOT_FOUND,
                message: "Product not found",
            };
        }

        if (user._id !== String(product.user)) {
            throw {
                status: status.FORBIDDEN,
                message: "access denied",
            };
        }

        const result = await deleteProduct({ productId });

        res.status(status.OK).json({
            success: true,
            ...result,
        });
    } catch (err) {
        next(err);
    }
}
