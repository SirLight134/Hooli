import "dotenv/config"; // loads your .env
import { describe, it, expect } from "vitest";
import { sendWelcomeEmail } from "./src/services/email.service.js";

const testEmail = "ibrahimsaad134@gmail.com"; // <-- put YOUR email here to check the inbox

describe("Email Service", () => {
    it("should send a welcome email without throwing", async () => {
        await expect(
            sendWelcomeEmail(testEmail, "Ibrahim")
        ).resolves.not.toThrow();
    }, 10_000); // 10s timeout for real network call
});
