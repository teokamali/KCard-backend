import mongoose from "mongoose";
import config from "config";

async function connect() {
    const dbName = config.get<string>("db.name");
    const dbUrl = config.get<string>("db.url");

    try {
        await mongoose.connect(`${dbUrl}/${dbName}`);
        console.log("Database connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connect;
