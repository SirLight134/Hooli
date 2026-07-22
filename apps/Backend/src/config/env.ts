import dotenv from "dotenv";
dotenv.config();


const REQUIRED_ENV_VARS = [
    'PORT',
    'MONGO_URI',
    'JWT_SECRET',
    'CLIENT_URL',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
] as const;

export function validateEnv(): void {
    const missing: string[] = [];

    for (const key of REQUIRED_ENV_VARS) {
        if (!process.env[key] || process.env[key]?.trim() === '') {
            missing.push(key);
        }
    }

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variable(s): ${missing.join(', ')}`
        );
    }
}
validateEnv()


export const env = {
    PORT: Number(process.env.PORT),
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
} as const;