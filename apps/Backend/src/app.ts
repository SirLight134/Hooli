import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes'; // TODO: Uncomment when routes are ready
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import dbConnect from './config/database';
import mongoose from 'mongoose';
dotenv.config();
dbConnect();
const app = express();

// ============================================
// 1. CORS Configuration (Must be first)
// ============================================
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// ============================================
// 2. Body Parsers
// ============================================
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ============================================
// 3. Request Logging (Optional but useful)
// ============================================
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ============================================
// 4. Health Check Route
// ============================================
app.get('/health', (req: Request, res: Response) => {
  const isHealthy = mongoose.connection.readyState === 1;
  const statusCode = isHealthy ? 200 : 503;

  res.status(statusCode).json({
    status: statusCode,
    timestamp: new Date().toISOString(),
    db: {
      connected: isHealthy,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
    }
  });
});

// ============================================
// 5. API Routes (Commented out for now)
// ============================================
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
// app.use('/api', apiRoutes);

// ============================================
// 6. 404 Handler (Must come after all routes)
// ============================================
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// ============================================
// 7. Global Error Handler (Must be last)
// ============================================
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);

  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;