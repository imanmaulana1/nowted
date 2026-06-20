# Nowted App

![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript 6](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite 8](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express 5](https://img.shields.io/badge/Express-5.0-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma 7](https://img.shields.io/badge/Prisma-7.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

A beautiful, cloud-synced note-taking workspace built as a modern, type-safe TypeScript full-stack monorepo.

---

## 🔗 Quick Navigation & Links

**Project Resources**

- 🚀 **[Live Demo]()**
- 📄 **[API Docs]()**

**Monorepo Packages**

- 💻 **[Frontend SPA (React 19)](./apps/web)**
- ⚙️ **[Backend API (Express 5)](./apps/api)**

---

## 📷 Preview

![Nowted App Preview](docs/banner.png)

---

## 📝 Overview

**Nowted** is a beautiful, cloud-synced note-taking workspace designed for minimal writing, distraction-free editing, and structured folder organization. Built as a modern, type-safe TypeScript full-stack monorepo. It gives you dedicated spaces for active, favorited, archived, and deleted notes—ensuring your thoughts remain structured and your dashboard stays clean.

---

## ✨ Core Engineering Features

| Feature                               | Description                                                                                                                                                                                                               |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 📝 **Rich Text Editor**               | A distraction-free, WYSIWYG editor powered by TipTap that stores documents as structured JSON nodes. Features native markdown file uploading/parsing, a custom floating text-formatting toolbar, and Tailwind typography. |
| 📁 **Folder Management**              | Group and categorize notes into custom collections. Enforces database-level unique constraints (`[userId, name]` & `[userId, slug]`) to prevent duplicate folder naming.                                                  |
| 🔐 **Secure Auth & Session Rotation** | Implements a dual-token JWT authentication system (15-min Access Tokens & 7-day database-backed Refresh Tokens) preventing replay attacks via session rotation.                                                           |
| 🔍 **Debounced Search**               | Instantly query notes by title or content, optimized with a custom `useDebounce` hook to throttle API calls and prevent database spamming.                                                                                |
| 📂 **Trash & Archive Soft-State**     | Full lifecycle notes management using stateful timestamps (`archivedAt`, `trashedAt`) instead of basic binary enums, enabling easy restoration and tracking.                                                              |
| ⭐️ **Pinned Favorites**               | Instantly star essential documents for quick access directly from the sidebar workspace navigation.                                                                                                                       |

## 🛠️ Tech Stack & Tooling

| Layer                  | Frontend Client (`apps/web`)                   | Backend Server (`apps/api`)               |
| :--------------------- | :--------------------------------------------- | :---------------------------------------- |
| **Runtime / Env**      | Browser / Vite 8.x                             | Node.js 24.x                              |
| **Language**           | TypeScript 6.x                                 | TypeScript 6.x (ESM with `#/*` Aliases)   |
| **Core Framework**     | React 19.x                                     | Express 5.x (Native Async Error Handling) |
| **State Management**   | TanStack Query & Zustand                       | -                                         |
| **Routing**            | TanStack Router (File-based, Type-safe params) | Express Router (`/api/v1`)                |
| **Forms & Validation** | TanStack Form + Zod Schema Validation          | Zod Request Validation Middleware         |
| **Database / ORM**     | -                                              | PostgreSQL (Neon Cloud) + Prisma 7.x      |
| **Styling & UI**       | Tailwind CSS v4 + Base UI + shadcn/ui          | Helmet & CORS Security Middlewares        |
| **Testing**            | Vitest                                         | Vitest + Supertest                        |

---

## 🏛️ System Architecture

The application communicates over a JSON REST API. All database interactions are decoupled from business services to guarantee testability.

```mermaid
graph TD
  subgraph Client App [apps/web]
    UI[React 19 UI Components] --> Router[TanStack Router]
    UI --> Query[TanStack Query / Client State]
  end

  subgraph API Server [apps/api]
    Routes[Express Router /api/v1] --> Middleware[Validation / Auth Middleware]
    Middleware --> Controllers[Express Controllers]
    Controllers --> Services[Business Services]
    Services --> Repositories[Prisma Data Repositories]
  end

  UI -->|HTTP / JSON Requests| Routes
  Repositories -->|Prisma Client| DB[(PostgreSQL Database)]
```

---

## 📦 Monorepo Structure

```txt
nowted/
├── apps/
│   ├── web/        # React + Vite frontend SPA (Tailwind CSS v4, TanStack stack)
│   └── api/        # Express + Prisma REST API backend (PostgreSQL)
├── docs/
│   └── mockup.png  # UI Mockups & portfolio assets
├── package.json    # Monorepo Workspace configuration
├── pnpm-workspace.yaml
└── README.md       # Project documentation (this file)
```

---

## 🧠 Engineering Decisions

### 1. PNPM Workspace Monorepo

Using a monorepo setup simplifies local development workflows. It allows unified dependency management, local directory linking, and provides a clear structure that mirrors modern engineering teams where multiple packages interact under a single repo.

### 2. TanStack Ecosystem for Type-Safety

- **TanStack Router**: Selected for file-based routing. It guarantees complete type-safety across links, path parameters, and search query validation, entirely preventing broken links at compile-time.
- **TanStack Query**: Handled state synchronization, client-side caching, loading states, and pessimistic updates, reducing custom HTTP boilerplate code by 80%.
- **TanStack Form**: Assures type-safe state tracking for complex input fields and integrates seamlessly with Zod for real-time client-side validation.

### 3. Layered Repository Pattern (Backend)

To avoid database spaghetti, the backend follows the `Route -> Controller -> Service -> Repository` architecture. Controllers are isolated from query logic; they delegate validation to Zod middlewares, business logic to Services, and database queries to Repositories. This structure makes modules highly testable and refactorable.

### 4. Database-Backed Session Rotation

Instead of stateless JWT logout issues, sessions are tracked via a database `Session` model. Refresh tokens are hashed using SHA-256 before storage. Old refresh tokens are rotated out on reuse detection, protecting users against token hijacking.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js v24.x](https://nodejs.org) and [pnpm](https://pnpm.io) installed on your local machine.

### 1. Clone & Setup Dependencies

```bash
git clone <repo-url> nowted
cd nowted
pnpm install
```

### 2. Configure Environment Variables

Create `.env` files in both package directories matching the layout below:

- Frontend: `apps/web/.env`
- Backend: `apps/api/.env`

### 3. Initialize Database Migrations

Configure your PostgreSQL connection string in the backend `.env`, then run:

```bash
pnpm --filter api prisma migrate dev
```

### 4. Launch Development Servers

Run both dev servers concurrently:

```bash
# Start backend Express server (Port 5000)
pnpm --filter api dev

# Start frontend Vite server (Vite default port)
pnpm --filter web dev
```

---

## 🔑 Environment Variables

### Frontend (`apps/web`)

Create `apps/web/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### Backend (`apps/api`)

Create `apps/api/.env`:

```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://user:password@localhost:5432/nowted
ACCESS_TOKEN_SECRET=your_super_secret_access_key
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
JWT_ISSUER=nowted-api
JWT_AUDIENCE=nowted-app
CLOUDINARY_URL=your_optional_cloudinary_url
```

---

## 💻 Available Commands

Run these scripts from the monorepo root directory:

| Command                           | Description                                          |
| :-------------------------------- | :--------------------------------------------------- |
| `pnpm install`                    | Installs all packages and workspaces dependencies    |
| `pnpm --filter web dev`           | Runs frontend Vite dev server                        |
| `pnpm --filter api dev`           | Runs backend Express dev server                      |
| `pnpm -r run build`               | Builds all packages for production concurrently      |
| `pnpm -r run lint`                | Runs ESLint configuration across all monorepo scopes |
| `pnpm -r run test`                | Executes all Vitest suites                           |
| `pnpm --filter web test:coverage` | Generates a frontend test coverage report            |

---

## 📄 License

This repository is distributed under the [MIT License](LICENSE).
