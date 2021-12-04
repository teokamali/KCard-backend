import { number, object, string } from "zod";

const payload = {
    body: object({
        title: string({
            required_error: "title is require",
        }),
        description: string({
            required_error: "description is require",
        }),
        price: number({
            required_error: "price is require",
        }),
        image: string({
            required_error: "image is require",
        })
    }),
};
