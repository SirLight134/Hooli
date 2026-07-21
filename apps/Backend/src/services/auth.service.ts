
import User, { IUser } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const registerService = async (userData: Partial<IUser>) => {
    try {
        const { name, email, password, role } = userData;

        if (!name || !email || !password) {
            throw new Error("All fields are required")
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new Error("User already exists")
        }

        const user = await User.create({
            name,
            email,
            password,
            ...(role && { role })
        });
        const token = await user.generateToken();
        return { message: "User registered successfully", token: token, user }

    } catch (error: any) {
        logger.error(error, 'Register service failed');
        throw new Error(error.message)
    }
}

export const loginService = async (email: string, password: string) => {
    try {
        if (!email || !password) {
            throw new Error("All fields are required")
        }

        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            throw new Error("User not found")
        }

        const isPasswordMatched = await user.comparePassword(password)

        if (!isPasswordMatched) {
            throw new Error("Invalid password")
        }

        const token = await user.generateToken();
        return { message: "User logged in successfully", token, user }

    } catch (error: any) {
        logger.error(error, 'Login service failed');
        throw new Error(error.message)
    }
}

export const refreshService = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found")
    }
    const token = await user.generateToken();
    return { message: "Token refreshed successfully", token }
}



export const logoutService = async (userId: string) => {
    return { message: "User logged out successfully" }
}

