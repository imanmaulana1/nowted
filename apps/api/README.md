# Nowted REST API

![Node.js](https://img.shields.io/badge/Node.js-24.x-6DB33F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.0-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

A secure, high-performance RESTful API powering the Nowted note-taking workspace, built with Express 5, Prisma 7, and PostgreSQL.

---

## 🔗 Quick Navigation & Links

**Project Resources**

- 🚀 **[Live Demo](https://nowted.pages.dev/)**
- 📄 **[API Docs]()**

**Monorepo Packages**

- 💻 **[Frontend SPA (React 19)](../web)**
- ⚙️ **[Backend API (Express 5)](./)**
- 📁 **[Monorepo Root](../../)**

---

## 📷 Preview

![Nowted App Preview](../../docs/mockup.png)

---

## 📝 Overview

**Nowted API** is the secure, cloud-enabled RESTful backend that powers the Nowted note-taking workspace. It manages user accounts, coordinates note and folder database records, validates incoming requests, and handles secure session states.

Rather than combining database queries and HTTP logic in a single file, the server is built upon a **Modular Layered Architecture** (Route → Controller → Service → Repository). This strict separation of concerns ensures that business logic is fully isolated, highly testable, and easy to maintain as the application scales.

---

## ✨ Key Features

| Feature                   | Description                                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔐 **JWT Authentication** | Stateless access tokens (short-lived) + secure `HttpOnly` cookie refresh tokens, implemented using the `jose` library for full RFC compliance. |
| 🔄 **Token Refresh Flow** | Dedicated `/auth/refresh` endpoint that silently reissues access tokens without requiring re-login.                                            |
| 📂 **Folder Management**  | Full CRUD for user-owned folders used to categorize notes.                                                                                     |
| 📝 **Notes CRUD**         | Create, read, update, and soft-delete notes with support for **favorites**, **archive**, and **trash** states.                                 |
| 🗑️ **Trash & Restore**    | Soft-deleted notes land in Trash and can be permanently deleted or fully restored.                                                             |
| 🖼️ **Image Uploading**    | Multipart file uploads handled via `multer` and stored on **Cloudinary**.                                                                      |
| 👤 **User Profile**       | Retrieve and update user details including profile picture.                                                                                    |
| 📖 **OpenAPI Docs**       | Interactive API reference auto-generated from Zod schemas via `@asteasolutions/zod-to-openapi` and rendered with **Scalar**.                   |

---

## 🛠️ Tech Stack

### Core

| Technology                                      | Role                                            |
| ----------------------------------------------- | ----------------------------------------------- |
| [Node.js 24](https://nodejs.org/)               | JavaScript runtime (ESM mode)                   |
| [TypeScript 6](https://www.typescriptlang.org/) | Strict static typing across the entire codebase |
| [Express 5](https://expressjs.com/)             | HTTP server and routing framework               |

### Database & ORM

| Technology                                                                           | Role                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [Prisma 7](https://www.prisma.io/)                                                   | Type-safe ORM with migration management                       |
| [PostgreSQL](https://www.postgresql.org/)                                            | Primary relational database (supports Neon DB for serverless) |
| [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/overview/databases/postgresql) | Native `pg` driver adapter for Prisma                         |

### Security & Auth

| Technology                                                  | Role                                       |
| ----------------------------------------------------------- | ------------------------------------------ |
| [jose](https://github.com/panva/jose)                       | RFC-compliant JWT signing and verification |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js)            | Secure password hashing                    |
| [Helmet](https://helmetjs.github.io/)                       | HTTP security headers                      |
| [CORS](https://github.com/expressjs/cors)                   | Cross-origin request policy                |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | `HttpOnly` refresh token cookie parsing    |

### Validation & Docs

| Technology                                                           | Role                                            |
| -------------------------------------------------------------------- | ----------------------------------------------- |
| [Zod v4](https://zod.dev/)                                           | Runtime request body and params validation      |
| [`zod-to-openapi`](https://github.com/asteasolutions/zod-to-openapi) | Auto-generate OpenAPI 3.1 spec from Zod schemas |
| [Scalar](https://scalar.com/)                                        | Modern interactive API reference UI             |

### File Uploads

| Technology                                    | Role                             |
| --------------------------------------------- | -------------------------------- |
| [Multer](https://github.com/expressjs/multer) | Multipart form-data handling     |
| [Cloudinary](https://cloudinary.com/)         | Cloud image storage and delivery |

### Testing

| Technology                                      | Role                                             |
| ----------------------------------------------- | ------------------------------------------------ |
| [Vitest](https://vitest.dev/)                   | Fast, Vite-native test runner                    |
| [Supertest](https://github.com/ladjs/supertest) | HTTP integration testing against the Express app |

---

## 🏗️ Architecture

This project implements a **Modular Layered Architecture** with a strict, unidirectional flow:

```
HTTP Request
     │
     ▼
  Router          ← Defines endpoints, applies auth & validation middlewares
     │
     ▼
 Controller       ← Parses request, calls service, sends HTTP response
     │
     ▼
  Service         ← Core business logic, domain rules, data orchestration
     │
     ▼
 Repository       ← Data access layer — all Prisma queries live here
     │
     ▼
 Prisma Client    ← Type-safe database interface
     │
     ▼
 PostgreSQL
```

### Directory Structure

```
apps/api/
├── prisma/
│   ├── schema.prisma              # Database schema definition
│   └── migrations/                # Migration history
├── src/
│   ├── app.ts                     # Express app initialization & middleware setup
│   ├── server.ts                  # Server entry point & graceful shutdown
│   ├── config/                    # App-wide configuration
│   │   ├── env.ts                 # Environment variable validation (Zod)
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── cloudinary.ts          # Cloudinary SDK initialization
│   │   ├── multer.ts              # Multer upload config
│   │   ├── openapi.ts             # OpenAPI registry setup
│   │   └── openapi-doc.ts         # OpenAPI document generator
│   ├── generated/                 # Auto-generated files (Prisma client)
│   ├── modules/                   # Feature domain modules
│   │   ├── auth/                  # Register, login, refresh, logout
│   │   ├── folders/               # Folder CRUD
│   │   ├── notes/                 # Notes CRUD, favorite, archive, trash
│   │   └── users/                 # User profile & avatar upload
│   └── shared/
│       ├── errors/                # Custom HttpError classes (400–429)
│       ├── middlewares/           # Auth guard, Zod validator, error handler
│       ├── routes/                # Root & versioned router aggregation
│       ├── schemas/               # Shared Zod schemas
│       ├── types/                 # Shared TypeScript interfaces
│       └── utils/                 # HTTP response formatter, logger
└── tests/                         # Integration test suites (Vitest + Supertest)
```

---

## 📡 API Endpoints Overview

> 📖 Full interactive API reference (Scalar) is available at `http://localhost:5000/docs` when the dev server is running.

### 🔐 Auth — `/api/v1/auth`

| Method  | Endpoint           | Auth Required | Description                                         |
| :-----: | ------------------ | :-----------: | --------------------------------------------------- |
| `POST`  | `/register`        |      ❌       | Register a new user account                         |
| `POST`  | `/login`           |      ❌       | Login and receive access + refresh tokens           |
| `POST`  | `/refresh`         |      ❌       | Silently reissue an access token via refresh cookie |
| `POST`  | `/logout`          |      ❌       | Invalidate the refresh token cookie                 |
|  `GET`  | `/me`              |      ✅       | Get the current authenticated user                  |
| `PATCH` | `/change-password` |      ✅       | Change account password                             |

### 📂 Folders — `/api/v1/folders`

|  Method  | Endpoint       | Auth Required | Description                          |
| :------: | -------------- | :-----------: | ------------------------------------ |
|  `GET`   | `/`            |      ✅       | Get all folders for the current user |
|  `POST`  | `/`            |      ✅       | Create a new folder                  |
| `PATCH`  | `/:folderSlug` |      ✅       | Rename an existing folder            |
| `DELETE` | `/:folderSlug` |      ✅       | Delete a folder                      |

### 📝 Notes — `/api/v1/notes`

|  Method  | Endpoint               | Auth Required | Description                                                                     |
| :------: | ---------------------- | :-----------: | ------------------------------------------------------------------------------- |
|  `GET`   | `/`                    |      ✅       | List notes — supports `folder`, `favorite`, `archived`, `trashed` query filters |
|  `POST`  | `/`                    |      ✅       | Create a new note                                                               |
|  `GET`   | `/:noteSlug`           |      ✅       | Get a single note by slug                                                       |
| `PATCH`  | `/:noteSlug`           |      ✅       | Update note title or content                                                    |
| `DELETE` | `/:noteSlug`           |      ✅       | Delete a note                                                                   |
| `PATCH`  | `/:noteSlug/favorite`  |      ✅       | Toggle favorite status                                                          |
| `PATCH`  | `/:noteSlug/archive`   |      ✅       | Move note to archive                                                            |
| `PATCH`  | `/:noteSlug/unarchive` |      ✅       | Remove note from archive                                                        |
| `PATCH`  | `/:noteSlug/trash`     |      ✅       | Move note to trash                                                              |
| `PATCH`  | `/:noteSlug/restore`   |      ✅       | Restore note from trash                                                         |

### 👤 Users — `/api/v1/users`

| Method  | Endpoint   | Auth Required | Description                                  |
| :-----: | ---------- | :-----------: | -------------------------------------------- |
| `PATCH` | `/profile` |      ✅       | Update user profile name and/or avatar image |

---

## ⚙️ Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 9
- A running **PostgreSQL** instance (local or [Neon DB](https://neon.tech/))

### 1. Clone the Repository

```bash
git clone https://github.com/imanmaulana1/nowted.git
cd nowted
```

### 2. Install Dependencies

Install from the **monorepo root**:

```bash
pnpm install
```

### 3. Configure Environment Variables

```bash
cd apps/api
cp .env.example .env
```

Open `.env` and fill in the required values:

```env
PORT=5000
NODE_ENV=development

# PostgreSQL connection string (Neon DB or local)
DATABASE_URL="postgresql://username:password@localhost:5432/nowted_db?schema=public"

# JWT secrets — use strong, randomly generated strings
ACCESS_TOKEN_SECRET="your_access_token_secret"
REFRESH_TOKEN_SECRET="your_refresh_token_secret"

# JWT claims
JWT_ISSUER="nowted-api"
JWT_AUDIENCE="nowted-web"

# CORS — set to the frontend dev server origin
CORS_ORIGIN="http://localhost:5173"

# Cloudinary — for image uploads
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 4. Run Database Migrations

```bash
# For rapid local development (no migration files)
pnpm prisma db push

# For formal, tracked migrations
pnpm prisma migrate dev
```

### 5. Start the Development Server

From the **workspace root**:

```bash
pnpm --filter nowted-api dev
```

Or from `apps/api` directly:

```bash
pnpm dev
```

The API will be available at [http://localhost:5000](http://localhost:5000).
Interactive API docs (Scalar) at [http://localhost:5000/docs](http://localhost:5000/docs).

### 6. Other Useful Scripts

```bash
pnpm build            # Compile TypeScript to JavaScript
pnpm start            # Run the compiled production build
pnpm lint             # Run ESLint static analysis
pnpm typecheck        # Run TypeScript type checking (no emit)
pnpm test             # Run all tests once
pnpm test:watch       # Run tests in interactive watch mode
pnpm test:coverage    # Run tests and generate a coverage report
```
