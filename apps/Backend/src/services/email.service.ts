import nodemailer from "nodemailer";
import logger from "../utils/logger.js";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const FROM_ADDRESS = process.env.SMTP_FROM || '"Hooli" <no-reply@yourdomain.com>';

export const sendOrderConfirmation = async (email: string, order: any) => {
    try {
        await transporter.sendMail({
            from: FROM_ADDRESS,
            to: email,
            subject: "Order Confirmation",
            html: `
        <h1>Order #${order._id} confirmed</h1>
        <p>Thanks for your order! Here's a summary:</p>
        <ul>
          ${order.products
                    .map(
                        (item: any) =>
                            `<li>${item.quantity} x ${item.product?.name || "Item"} — $${item.priceAtPurchase}</li>`
                    )
                    .join("")}
        </ul>
        <p><strong>Total: $${order.total}</strong></p>
        <p>Shipping to: ${order.shippingAddress}</p>
      `,
        });
        logger.info({ email, orderId: order._id }, "Order confirmation email sent");
    } catch (error) {
        logger.error(error, `Failed to send order confirmation email to ${email}`);
        // Don't rethrow — an email failure shouldn't fail the order itself
    }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
    try {
        await transporter.sendMail({
            from: FROM_ADDRESS,
            to: email,
            subject: "Welcome to Hooli!",
            html: `
        <h1>Welcome, ${name}!</h1>
        <p>Thanks for creating an account with Hooli. We're glad to have you.</p>
        <p>You can start browsing products right away.</p>
      `,
        });
        logger.info({ email }, "Welcome email sent");
    } catch (error) {
        logger.error(error, `Failed to send welcome email to ${email}`);
    }
};

export const sendPasswordReset = async (email: string, token: string) => {
    try {
        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
        await transporter.sendMail({
            from: FROM_ADDRESS,
            to: email,
            subject: "Reset Your Password",
            html: `
        <h1>Password Reset Request</h1>
        <p>We received a request to reset your password. Click the link below to continue:</p>
        <p><a href="${resetUrl}">Reset Password</a></p>
        <p>This link will expire in 30 minutes. If you didn't request this, you can safely ignore this email.</p>
      `,
        });
        logger.info({ email }, "Password reset email sent");
    } catch (error) {
        logger.error(error, `Failed to send password reset email to ${email}`);
        throw error; // rethrow here — the caller likely needs to know if this failed
    }
};