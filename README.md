# Hooli — E-Commerce SaaS (Multi-Vendor Marketplace)

> **Live Website**: [https://almanac-challenge-progress.ngrok-free.dev](https://almanac-challenge-progress.ngrok-free.dev)

A modern, full-stack **multi-vendor e-commerce SaaS** built as a monorepo. Supports **buyer**, **seller**, and **admin** roles with Stripe payments, secure JWT authentication, and shared TypeScript types/schemas across the entire stack.

Built end-to-end with **TypeScript** for maximum type safety — from the database models and Express API to the React frontend and shared validation schemas.

---

## 👥 Role Overview

| Role   | Capabilities |
|--------|-------------|
| **Buyer**  | Browse products, manage cart, checkout with Stripe, view order history |
| **Seller** | Manage product inventory, view incoming orders, update order status |
| **Admin**  | Dashboard analytics, user management, platform oversight |

---

## ✨ Features

- **Multi-role authentication** — JWT-based with role-guarded middleware (`requireSeller`, `requireBuyerOrSeller`, `requireAdmin`)
- **Stripe integration** — Checkout Sessions for payments + Webhooks for automated order fulfillment
- **Product CRUD** — Full create, read, update, delete with seller ownership checks via `isOwner` middleware
- **Cart** — Client-side persistence via Zustand store with local storage
- **Product browsing** — Public GET routes (no auth required for browsing), with filtering (category, brand, price range) and pagination
- **Admin dashboard** — Aggregate stats (users, products, orders), user role management
- **File uploads** — Product image uploads via Multer (local storage) with Cloudinary integration
- **Email notifications** — Order confirmations, welcome emails, password resets via Nodemailer
- **Rate limiting** — API-wide rate limiter via `express-rate-limit`
- **Security headers** — Helmet, CORS, HPP, Mongo sanitize, input validation via Zod
- **Error handling** — Global error handler with typed `AppError` class, structured logging via Pino

---

## 🏗 Tech Stack

| Category       | Tools & Libraries |
|----------------|-------------------|
| **Monorepo**   | Turborepo, pnpm workspaces |
| **Frontend**   | Vite, React 18+, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand |
| **Backend**    | Express, TypeScript, Mongoose, Zod, Stripe, jsonwebtoken, bcryptjs |
| **Shared**     | Zod schemas, TypeScript types/interfaces, constants, utils |
| **Payments**   | Stripe (Checkout Sessions + Webhooks) |
| **Database**   | MongoDB (Atlas) |
| **Email**      | Nodemailer (SendGrid / SMTP) |
| **Uploads**    | Multer + Cloudinary |
| **Logging**    | Pino + pino-http |
| **Testing**    | Vitest |
| **Dev Tools**  | ESLint, Prettier, tsx (watch mode), Docker, GitHub Actions (CI/CD) |

---

## 📂 Project Structure

```
hooli/
├── apps/
│   ├── frontend/              # Vite + React + TS + shadcn/ui
│   │   ├── src/
│   │   │   ├── api/           # Axios client with auth interceptor
│   │   │   ├── components/    # React components (UI, product, cart, etc.)
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   ├── lib/           # Constants, utilities
│   │   │   ├── pages/         # Route pages (Home, ProductDetail, Cart, etc.)
│   │   │   ├── store/         # Zustand stores (cart, auth)
│   │   │   └── types/         # Frontend-specific types
│   │   └── __tests__/         # Vitest tests
│   │
│   └── backend/               # Express + TS + Mongoose + Stripe
│       ├── src/
│       │   ├── config/        # CORS, database, environment
│       │   ├── controllers/   # Route handlers (auth, product, order, admin, seller, stripe)
│       │   ├── middlewares/   # Auth, role, owner, validation, rate-limit, upload, error
│       │   ├── models/        # Mongoose models (User, Product, Order)
│       │   ├── routes/        # Express route definitions
│       │   ├── services/      # Business logic (auth, order, stripe, email)
│       │   ├── types/         # Express type augmentation, backend types
│       │   ├── utils/         # Errors, JWT, logger, helpers
│       │   └── __tests__/     # Vitest tests
│       └── uploads/           # Local file uploads directory
│
├── packages/
│   └── shared/                # Shared TS types, Zod schemas, utils, constants
│       ├── src/
│       │   ├── constants/     # Enums, order status, roles
│       │   ├── types/         # Shared interfaces (IUser, IProduct, IOrder, etc.)
│       │   ├── schemas/       # Zod validation schemas
│       │   └── utils/         # Shared utilities
│       └── tests/             # Vitest tests (64 tests)
│
├── .github/workflows/         # CI: lint, test, build
├── docker/                    # Dockerfiles + docker-compose.yml
├── .env.example               # Environment variable template
├── .gitignore
├── package.json               # Workspaces + turbo deps
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.json              # Base TypeScript config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 8
- **MongoDB** (local or Atlas)
- **Stripe account** (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/SirLight134/Hooli.git
cd Hooli

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example apps/backend/.env
# Edit apps/backend/.env with your credentials

# Start development servers
pnpm dev
```

This runs both frontend (port 5173) and backend (port 5000) concurrently with hot-reload.

### Testing

```bash
# Run all tests across the monorepo
pnpm test

# Run tests for a specific package
pnpm --filter @hooli/backend test
pnpm --filter @hooli/frontend test
pnpm --filter @hooli/shared test
```

---

## 🌐 API Overview

All API routes are mounted under `/api` and proxied through Vite during development.

| Method | Endpoint              | Auth Required | Description |
|--------|----------------------|---------------|-------------|
| POST   | `/api/auth/register` | No            | Register new user |
| POST   | `/api/auth/login`    | No            | Login |
| GET    | `/api/products`      | No            | Browse products (public) |
| GET    | `/api/products/:id`  | No            | Get product details |
| POST   | `/api/products`      | Seller        | Create product |
| PUT    | `/api/products/:id`  | Owner         | Update product |
| DELETE | `/api/products/:id`  | Owner         | Delete product |
| POST   | `/api/orders`        | Buyer         | Create order |
| GET    | `/api/orders`        | Buyer/Admin   | List orders |
| POST   | `/api/stripe/create-checkout-session` | Buyer | Stripe checkout |
| GET    | `/api/admin/dashboard` | Admin       | Dashboard stats |

---

## 🔒 Environment Variables

| Variable                | Description |
|------------------------|-------------|
| `PORT`                 | Backend server port |
| `NODE_ENV`             | Environment mode |
| `MONGO_URI`            | MongoDB connection string |
| `JWT_SECRET`           | JWT signing secret |
| `CLIENT_URL`           | Frontend URL |
| `STRIPE_SECRET_KEY`    | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET`| Stripe webhook signing secret |
| `SMTP_HOST`            | Email SMTP host |
| `SMTP_PORT`            | Email SMTP port |
| `SMTP_USER`            | Email SMTP user |
| `SMTP_PASS`            | Email SMTP password |
| `LOG_LEVEL`            | Pino log level |

---

## 📦 Packages

| Package | Path | Description |
|---------|------|-------------|
| `@hooli/backend` | `apps/backend` | Express API server |
| `@hooli/frontend` | `apps/frontend` | React client |
| `@hooli/shared` | `packages/shared` | Shared types, schemas, constants |

---

## 🧪 Test Coverage

- **Shared**: 64 tests — schema validation, constants, utilities
- **Backend**: 15 tests — error handling, auth service
- **Frontend**: 7 tests — cart store

---

## 📄 License

MIT
