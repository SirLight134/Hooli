import jwt, { SignOptions } from "jsonwebtoken";

export const signToken = (payload: object, expiresIn: SignOptions["expiresIn"] = "7d"): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
};

export const verifyToken = <T>(token: string): T => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as T;
};
