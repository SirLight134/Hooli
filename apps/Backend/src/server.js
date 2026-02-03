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
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Hooli Backend is running' });
});
// Example API routes
app.get('/api/products', (req, res) => {
    res.json({ products: [] });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
