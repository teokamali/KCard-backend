import { Router } from "express";
import requireUser from "../middleware/requireUser";
import validatorResource from "../middleware/validatorResource";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "../controllers/product.controller";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "../schema/product.schema";

const productRouter = Router();

productRouter.post("/", [requireUser, validatorResource(createProductSchema)], createProductHandler);
productRouter.get("/:productId", validatorResource(getProductSchema), getProductHandler);
productRouter.put("/:productId", [requireUser, validatorResource(updateProductSchema)], updateProductHandler);
productRouter.delete("/:productId", [requireUser, validatorResource(deleteProductSchema)], deleteProductHandler);

export default productRouter;
