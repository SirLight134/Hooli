import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Hooli API",
            version: "1.0.0",
            description: "Multi-vendor e-commerce marketplace API — buyers, sellers, and admin",
        },
        servers: [
            { url: "http://localhost:3000", description: "Development" },
            { url: "https://almanac-challenge-progress.ngrok-free.dev", description: "Production" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
