# Backend API -- Production‑Ready User Service

## Overview

This project is a **production-style backend API** built with **Node.js,
Express, TypeScript, Prisma ORM, and PostgreSQL (Neon)**.\
It demonstrates how to design, implement, and deploy a scalable backend
service following modern software engineering practices.

The API provides a **user management service** with secure password
handling and database persistence.\
It is deployed in the cloud and accessible through a public endpoint.

This project highlights practical backend engineering skills including:

-   REST API architecture
-   Database modeling
-   ORM integration
-   Cloud deployment
-   Secure password storage
-   Environment configuration
-   Production build pipelines

------------------------------------------------------------------------

# Live Demo

**Production API**

https://backend-api-1vu2.onrender.com

Example request:

GET /users

------------------------------------------------------------------------

# Tech Stack

Backend - Node.js - Express.js - TypeScript

Database - PostgreSQL - Neon Serverless Postgres

ORM - Prisma

Security - bcrypt password hashing

Deployment - Render

Configuration - dotenv

------------------------------------------------------------------------

# Key Features

## RESTful API Design

The backend follows REST principles with clear resource-based endpoints.

Example:

GET /users\
POST /users

## Database Integration

The service connects to a managed **Neon PostgreSQL database** using
**Prisma ORM**.

Benefits:

-   type-safe queries
-   simplified database migrations
-   strong schema validation

## Secure Password Handling

Passwords are **never stored in plaintext**.\
They are hashed using **bcrypt** before being stored in the database.

## Cloud Deployment

The API is deployed on **Render**, allowing the service to run
continuously in the cloud.

Deployment pipeline:

GitHub → Render → Production API

------------------------------------------------------------------------

# System Architecture

Client Request

↓

Express Server

↓

API Routes

↓

Prisma ORM

↓

PostgreSQL Database (Neon)

------------------------------------------------------------------------

# Project Structure

backend-api

src/ routes/ userRoutes.ts

    prisma/
        prismaClient.ts

    server.ts

prisma/ schema.prisma

dist/ compiled JavaScript output

package.json

README.md

------------------------------------------------------------------------

# Database Schema

Prisma User Model

model User { id Int @id @default(autoincrement()) email String @unique
password String name String role String createdAt DateTime
@default(now()) }

Field explanation:

id → primary key

email → unique user identifier

password → hashed password

name → display name

role → user role (USER / ADMIN)

createdAt → account creation timestamp

------------------------------------------------------------------------

# API Endpoints

## Health Check

GET /

Response

Backend API is running

------------------------------------------------------------------------

## Get All Users

GET /users

Example Response

\[ { "id": 1, "email": "binh@test.com", "name": "Binh", "role": "USER",
"createdAt": "2026-03-08T02:11:37.093Z" }\]

------------------------------------------------------------------------

## Create User

POST /users

Example Body

{ "email": "test@example.com", "name": "Test User", "password":
"123456", "role": "USER" }

The password is automatically hashed before storing in the database.

------------------------------------------------------------------------

# Running Locally

## 1 Clone Repository

git clone https://github.com/binhpham-2002/backend-api.git

cd backend-api

------------------------------------------------------------------------

## 2 Install Dependencies

npm install

------------------------------------------------------------------------

## 3 Configure Environment Variables

Create a `.env` file

DATABASE_URL="postgresql://username:password@host:port/database"

PORT=10000

------------------------------------------------------------------------

## 4 Generate Prisma Client

npx prisma generate

------------------------------------------------------------------------

## 5 Push Database Schema

npx prisma db push

------------------------------------------------------------------------

## 6 Start Server

Development

npm run dev

Production

npm run build npm run start

------------------------------------------------------------------------

# Deployment

This project is deployed using **Render**.

Deployment steps:

1 Connect GitHub repository to Render

2 Set build command

npm install && npm run build

3 Set start command

npm run start

4 Add environment variable

DATABASE_URL

------------------------------------------------------------------------

# Example Request

curl https://backend-api-1vu2.onrender.com/users

------------------------------------------------------------------------

# Engineering Concepts Demonstrated

REST API development

TypeScript backend architecture

Database modeling

ORM usage

Secure password storage

Environment configuration

Cloud deployment

------------------------------------------------------------------------

# Future Improvements

JWT Authentication

Login endpoint

Role-based authorization

Input validation

Automated tests

Docker containerization

API documentation with Swagger

------------------------------------------------------------------------

# Author

Binh Duc Pham

GitHub\
https://github.com/binhpham-2002

------------------------------------------------------------------------

# License

MIT
