import { Express } from "express";
import errorHandler from "../middleware/errorHandler";
import sessionRouter from "./session.route";
import userRouter from "./user.route";

function routes(app: Express) {
    app.use("/api/users", userRouter);
    app.use("/api/sessions", sessionRouter);

    app.use(errorHandler);
}
    
export default routes;
