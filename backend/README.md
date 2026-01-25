# Blogify Backend

A fast and modern backend API for a blogging platform built with [Bun](https://bun.com), Express, and PostgreSQL.

## Prerequisites

- [Bun](https://bun.com) (v1.3.6 or higher)
- PostgreSQL database (or access to a PostgreSQL instance)

## Setup Instructions

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```env
# Server Configuration
SERVER_PORT=4000

# Database Configuration
DATABASE_URL=postgresql://[username]:[password]@[host]:[port]/[database]

# JWT Secret (used for token generation and verification)
JWT_SECRET=[your-jwt-secret-key]

# Frontend Endpoint (CORS configuration)
FRONTEND_APP_ENDPOINT=http://localhost:3000
```

**Environment Variables Explanation:**

- **SERVER_PORT**: The port on which the backend server will run (default: 4000)
- **DATABASE_URL**: PostgreSQL connection string with the format `postgresql://username:password@host:port/database`
- **JWT_SECRET**: A secure secret key used for signing and verifying JWT tokens. Generate a strong random string for production use
- **FRONTEND_APP_ENDPOINT**: The URL of your frontend application for CORS configuration (e.g., `http://localhost:3000` for development or your production URL)

### 3. Initialize the Database

Before running the application for the first time, initialize the database schema:

```bash
bun run db_init
```

This command will create the necessary tables (`users` and `blogs`) and PostgreSQL extensions required for the application.

## Running the Application

### Development Mode

Run the server with auto-reload on file changes:

```bash
bun run dev
```

### Production Mode

Run the server:

```bash
bun run start
```

## Available Scripts

- `bun run start` - Start the production server
- `bun run dev` - Start the development server with watch mode
- `bun run db_init` - Initialize the database schema

## Project Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Server entry point
├── config/
│   └── logger.ts          # Winston logger configuration
├── constants/
│   ├── errors.ts          # Error definitions
│   └── response.ts        # Response constants
├── controllers/           # Route controllers
├── database/              # Database initialization and schemas
├── middleware/            # Custom middleware
├── routes/                # API routes
├── services/              # Business logic
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── validators/            # Input validation schemas
```

## API Endpoints

The backend provides the following main endpoints:

- **Authentication**: Login, signup, token refresh
- **Blogs**: Create, read, update, delete blog posts

## Technology Stack

- **Runtime**: [Bun](https://bun.com)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Logging**: Winston
- **Password Hashing**: Bcrypt
