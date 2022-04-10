import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import connect from "./database/connect";
import routes from "./routes";
import log from "./utils/logger.utils";
import deserializedUser from "./middleware/deserializedUser";

const app = express();
const port = config.get<number>("port");
const baseUrl = config.get<number>("baseUrl");

app.use(cors());
app.use(deserializedUser);
app.use(express.json());

app.listen(port || 3000, async () => {
    log.info(`App listen at http://${baseUrl}:${port}`);

    await connect();
    routes(app);
});
