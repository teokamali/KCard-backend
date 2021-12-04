import { Router } from "express";
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from "../controllers/session.controller";
import requireUser from "../middleware/requireUser";
import validatorResource from "../middleware/validatorResource";
import { createUserSessionSchema } from "../schema/session.schema";

const sessionRouter = Router();

sessionRouter.post("/", validatorResource(createUserSessionSchema), createUserSessionHandler);

sessionRouter.get("/", requireUser, getUserSessionsHandler);
export default sessionRouter;

sessionRouter.delete("/", requireUser, invalidateUserSessionHandler);
