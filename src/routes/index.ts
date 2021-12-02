import { Express } from "express";
import userRouter from "./user.route";

function routes(app: Express) {
    app.use("/api/user", userRouter);
}

export default routes;
