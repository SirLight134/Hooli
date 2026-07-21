import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
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
// 5. API Routes (Commented out for now)
// ============================================
app.use(apiRateLimiter);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/stripe', stripeRoutes);

// ============================================
// 6. 404 Handler (Must come after all routes)
// ============================================
app.use(notFound);

// ============================================
// 7. Global Error Handler (Must be last)
// ============================================
app.use(errorHandler);

export default app;