import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import pinoHttp from 'pino-http';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import stripeWebhookRoutes from './routes/stripe.webhook.routes.js';
import dbConnect from './config/database';
import mongoose from 'mongoose';
import logger from './utils/logger.js';
import stripeRoutes from './routes/stripe.routes.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import { corsOptions } from './config/cors.js';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { apiRateLimiter } from './middlewares/rateLimit.js';
import sellerRoutes from './routes/seller.routes.js';
import adminRoutes from './routes/admin.routes.js';
dbConnect();

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
// ============================================
// 1. CORS Configuration (Must be first)
// ============================================
app.use(cors(corsOptions));

// ============================================
// 2. Body Parsers — webhook route MUST use raw body before global json parser
// ============================================
app.use('/stripe-webhook', express.raw({ type: 'application/json' }), stripeWebhookRoutes);
app.use(express.json()); // Parse JSON bodies for all other routes
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(mongoSanitize());
app.use(hpp());
// ============================================
// 3. Request Logging
// ============================================
app.use(pinoHttp({ logger }));

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
// 5. Serve Static Frontend (production build)
// ============================================
app.use(express.static(path.join(__dirname, '../public')));

// 6. API Routes
app.use(apiRateLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
// ============================================
// 7. SPA Fallback (must come after API routes, before 404)
// ============================================
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ============================================
// 8. 404 Handler (Must come after all routes)
// ============================================
app.use(notFound);

// 9. Global Error Handler (Must be last)
app.use(errorHandler);

export default app;