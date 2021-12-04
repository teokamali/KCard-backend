import express from "express";
import cors from "cors";
import config from "config";
import connect from "./database/connect";
import routes from "./routes";
import log from "./utils/logger.utils";

const app = express();
const port = config.get<number>("port");
const baseUrl = config.get<number>("baseUrl");

app.use(cors());
app.use(express.json());

app.listen(port || 3000, async () => {
    log.info(`App listen at http://${baseUrl}:${port}`);

    await connect();
    routes(app);
});
