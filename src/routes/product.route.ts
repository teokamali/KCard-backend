import { Router } from "express";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "../controllers/product.controller";
import requireUser from "../middleware/requireUser";
import validatorResource from "../middleware/validatorResource";

const productRouter = Router();

productRouter.post("/", [requireUser, validatorResource()], createProductHandler);
productRouter.put("/:productId", [requireUser, validatorResource()], updateProductHandler);
productRouter.get("/:productId", validatorResource(), getProductHandler);
productRouter.delete("/:productId", [requireUser, validatorResource()], deleteProductHandler);

export default productRouter;
