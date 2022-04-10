import Jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("keys.privateKey");

export function signJwt(payload: object, options?: Jwt.SignOptions | undefined) {
    return Jwt.sign(payload, privateKey, { ...options });
}

export function verfyJwt(token: string) {
    try {
        const decoded = Jwt.verify(token, privateKey);

        return {
            decoded,
            expired: false,
            valid: true,
        };
    } catch (err: any) {
        return {
            decoded: null,
            expired: err.message === "jwt expired",
            valid: false,
        };
    }
}
