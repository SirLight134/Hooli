import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.util.js";
export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
    generateToken: () => Promise<string>;
    role: "admin" | "seller" | "buyer";
    profile: {
        firstName: string;
        lastName: string;
        avatar: string;
        phoneNumber: string;
        dateOfBirth: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'buyer'],
        default: 'buyer',
        index: true
    },
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        phoneNumber: String,
        dateOfBirth: Date,
    },

}, {
    timestamps: true
})


// method to compare password
userSchema.methods.comparePassword = async function (this: any, password: string) {
    return await bcrypt.compare(password, this.password);
}

// method to generate JWT token
userSchema.methods.generateToken = async function () {
    return signToken({ id: this._id });
}

// middleware to hash password before saving
userSchema.pre('save', async function (this: any, next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next()

    } catch (error: any) {
        next(error)
    }

})








const User = mongoose.model<IUser>('User', userSchema);

export default User;