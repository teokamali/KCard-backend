import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email("Email is invalid"),
        password: string({
            required_error: "Passwod is required",
        }).min(6, "Password too short -  should be 6 chars in minimum"),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is reqired",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: " password and passwordConfirmation is not matched",
        path: ["passwordConfirmation"],
    }),
});

export type createUserInput = {
    body: {
        name: string;
        email: string;
        password: string;
    };
};
