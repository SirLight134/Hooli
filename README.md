#Hooli -> E-Commerce SaaS – Multi-Vendor Marketplace

A modern, full-stack **multi-vendor e-commerce SaaS** built as a monorepo. Supports **buyer**, **seller**, and **admin** roles with Stripe payments, secure authentication, and shared TypeScript types/schemas.

- Buyers: Browse products, add to cart, checkout with Stripe
- Sellers: Manage products, view orders
- Admin: Basic oversight (analytics, users, orders)

Built with **TypeScript** end-to-end for type safety across frontend, backend, and shared code.

## ✨ Features

- **Multi-role authentication** (JWT + role-based access)
- **Stripe integration** (Checkout Sessions + Webhooks for fulfillment)
- **Product CRUD** with seller ownership
- **Cart** (client-side persistence)
- **Modern frontend**: Vite + React + TypeScript + shadcn/ui + Tailwind + TanStack Query + Zustand
- **Backend**: Express + TypeScript + Mongoose + Zod validation
- **Shared package**: Types, Zod schemas, constants
- **Monorepo**: Turborepo + pnpm workspaces for fast builds & caching
- **Environment validation** with Zod
- **Error handling**, middleware, logging

## 🏗 Tech Stack

| Category       | Tools & Libraries                                                                 |
|----------------|-----------------------------------------------------------------------------------|
| Monorepo       | Turborepo, pnpm workspaces                                                        |
| Frontend       | Vite, React 18+, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand     |
| Backend        | Express, TypeScript, Mongoose, Zod, Stripe, jsonwebtoken, bcryptjs                |
| Shared         | Zod schemas, TypeScript types/interfaces                                          |
| Dev Tools      | ESLint, Prettier, tsconfig paths, Docker, GitHub Actions (CI/CD)                  |
| Payments       | Stripe (Checkout + Webhooks)                                                      |
| Database       | MongoDB (Atlas recommended)                                                       |

## 📂 Project Structure

```text
ecommerce-saas/
├── apps/
│   ├── frontend/          # Vite + React + TS + shadcn/ui
│   └── backend/           # Express + TS + Mongoose + Stripe
├── packages/
│   └── shared/            # Shared TS types, Zod schemas, utils, constants
├── .github/
│   └── workflows/         # CI: lint, test, build
├── docker/                # Dockerfiles + docker-compose.yml
├── .env.example
├── .gitignore
├── package.json           # workspaces + turbo dev deps
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json          # Base config
└── README.md