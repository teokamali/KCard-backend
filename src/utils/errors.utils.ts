import { ZodError } from "zod";

export function zodErrorsFormatter(e: ZodError) {
    return e.issues.map(({ message, path }) => ({
        message,
        path,
    }));
}
