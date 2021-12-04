import dayjs from "dayjs";
import pino from "pino";

const log = pino({
    prettyPrint: true,
    base: {},
    timestamp: () => `,"time": "${dayjs().format()}""`,
});

export default log;
