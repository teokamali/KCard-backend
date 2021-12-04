import mongoose from "mongoose";
import config from "config";
import log from "../utils/logger.utils";

async function connect() {
    const dbName = config.get<string>("db.name");
    const dbUrl = config.get<string>("db.url");

    try {
        await mongoose.connect(`${dbUrl}/${dbName}`);
        log.info("Database connected");
    } catch (err) {
        log.error(err);
        process.exit(1);
    }
}

export default connect;
