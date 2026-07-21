import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// Basic route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Hooli Backend is running' });
});
// Example API routes
app.get('/products', (req, res) => {
    res.json({ products: [] });
});


// Graceful shutdown on uncaught exception
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: ", err);
    process.exit(1);
});

// Graceful shutdown on unhandled rejection
process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection: ", err);
    process.exit(1);
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
