import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    createAt: Date;
    updateAt: Date;
    comparePassword(condidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;


    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

userSchema.pre("save", async function (next) {
    let user = this as UserDocument;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>("keys.saltWorkFactor"));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
