import config from "config";
import { get, omit } from "lodash";
import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import { signJwt, verfyJwt } from "../utils/jwt.utils";
import { findSession } from "./session.service";

export async function createUser(input: DocumentDefinition<Omit<UserDocument, "createAt" | "updateAt" | "comparePassword">>) {
    try {
        const user = await UserModel.create(input);

        return user;
    } catch (err: any) {
        throw err;
    }
}

export async function findUser(query: FilterQuery<UserDocument>, options?: QueryOptions | undefined) {
    try {
        const user = await UserModel.findOne(query, {}, options);

        return user;
    } catch (err: any) {
        throw err;
    }
}

export async function validateUserCerdential({ email, password }: { email: string; password: string }) {
    try {
        const user = await findUser({ email });

        if (!user) return false;

        const isValid = await user.comparePassword(password);

        if (!isValid) return false;

        return user;
    } catch (err) {
        throw err;
    }
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    const { decoded } = verfyJwt(refreshToken);

    if (!decoded || !get(decoded, "_id")) return false;

    const session = await findSession({ _id: get(decoded, "_id") });

    if (!session || !get(session, "user")) return false;

    const user = await findUser({ _id: session.user }, { lean: false });

    if (!user) return false;
    // create accessToken
    const accessToken = signJwt(
        {
            ...omit(user.toJSON(), "password"),
            session: session._id,
        },
        {
            expiresIn: config.get<string>("ttl.accessToken"),
        }
    );
    return accessToken;
}
