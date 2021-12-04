import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(
    input: DocumentDefinition<Omit<UserDocument, "createAt" | "updateAt" | "comparePassword">>
) {
    try {
        const user = await UserModel.create(input);

        return user
    } catch (err: any) {
        throw err;
    }
}

export async function findUser(query: FilterQuery<UserDocument>) {
    try {
        const user = await UserModel.findOne(query);

        return user
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
