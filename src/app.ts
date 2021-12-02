import express from "express";
import cors from "cors";
import config from "config";

const app = express();
const port = config.get<number>("port");
const baseUrl = config.get<number>("baseUrl");

app.use(cors)
app.use(express.json())

app.listen(port || 3000, () => {
    console.log(`App listen at http://${baseUrl}/${port}`);
});
