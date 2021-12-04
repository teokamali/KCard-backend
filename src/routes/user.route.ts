import { Router } from "express";
import { createUserHandler } from "../controllers/user.controller";
import validatorResource from "../middleware/validatorResource";
import { createUserSchema } from "../schema/user.schema";

const userRouter = Router();

userRouter.post("/", validatorResource(createUserSchema), createUserHandler);

export default userRouter;
