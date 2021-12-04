import { Router } from "express";
import { createUserSessionHandler } from "../controllers/session.controller";
import validatorResource from "../middleware/validatorResource";
import { createUserSessionSchema } from "../schema/session.schema";

const sessionRouter = Router();

sessionRouter.post(
    "/",
    validatorResource(createUserSessionSchema),
    createUserSessionHandler
);
export default sessionRouter;
