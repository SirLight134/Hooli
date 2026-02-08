import { z } from "zod";
import { Role } from "../types/user";
export const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).optional(),
    role: z.nativeEnum(Role), //
    name: z.string().min(3),
    phone: z.string().min(10),
    avatar: z.string().url().optional(),
})


export type User = z.infer<typeof userSchema>

export const createUserSchema = userSchema.extend({
    password: z.string().min(6),
})

export type CreateUserInput = z.infer<typeof createUserSchema>