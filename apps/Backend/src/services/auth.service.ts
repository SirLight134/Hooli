// import User from "../models/User.model.js";
// import type { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// const registerUser = async (req: Request, res: Response) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({ message: "All fields are required" })
//         }

//         const existingUser = await User.findOne({ email })
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" })
//         }

//         const user = await User.create({
//             name,
//             email,
//             password
//         });
//         return res.status(201).json({ message: "User registered successfully" })

//     } catch (error: any) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error" })
//     }

// }


// const loginUser = async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "All fields are required" })
//     }


//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//         return res.status(404).json({ message: "User not found" })
//     }


//     const isPasswordMatched = await user.comparePassword(password)

//     if (!isPasswordMatched) {
//         return res.status(401).json({ message: "Invalid password" })
//     }

//     const token = await user.generateToken();
//     return res.status(200).json({ message: "User logged in successfully", token })

// }


// const refreshToken = async (req: Request, res: Response) => {
//     const { token } = req.body;
//     if (!token) {
//         return res.status(400).json({ message: "Token is required" })
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
//         const user = await User.findById(decoded.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" })
//         }
//         const newToken = await user.generateToken();
//         return res.status(200).json({ message: "Token refreshed successfully", token: newToken })
//     } catch (error: any) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal server error" })
//     }
// }


import User, { IUser } from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const registerService = async (userData: Partial<IUser>) => {
    try {
        const { name, email, password } = userData;

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
            password
        });
        return { message: "User registered successfully" }

    } catch (error: any) {
        console.log(error);
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
        return { message: "User logged in successfully", token }

    } catch (error: any) {
        console.log(error);
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
