# Prisma + Koa + MySQL + TypeScript + Eslint Template

[中文](https://github.com/Bayn-Web/prisma_template/blob/main/Readme.md)

This template provides a quick start guide for building projects using Prisma, Koa, MySQL, TypeScript, and Eslint.

## Quick Start

### 1. Install Dependencies

- Run `npm install` to install the project dependencies.

### 2. Initialize Prisma

- Run `npx prisma init` to create the `prisma/schema.prisma` file and the `.env` file.
- Fill in the database URL in the `.env` file.

### 3. Create or Migrate the Database

- To create the database schema from scratch, run `npx prisma db push`.
- If you already have data in your database and want to update the schema while keeping the existing data, run `npx prisma migrate dev --name initial`.

### 4. Start the Service

- Run `npm run dev` to start the service in development mode.

---

## Detailed Steps

### 1. Install Dependencies

- Open your terminal or command line tool.
- Navigate to the project directory.
- Run `npm install` to install the project dependencies.

### 2. Initialize Prisma

- Run `npx prisma init` to create the `prisma/schema.prisma` file and the `.env` file.
- Fill in the database URL in the `.env` file, for example:

  ```plaintext
  DATABASE_URL="mysql://username:password@localhost:3306/database_name?charset=utf8mb4"
  ```
  
###  3. Create or Migrate the Database

 - To create the database schema from scratch, run `npx prisma db push`.
 - If you already have data in your database and want to update the schema while keeping the existing data, run `npx prisma migrate dev --name initial`.

 ### 4. Start the Service
 - Run `npm run dev` to start the service in development mode.

 ### Notes
 - Make sure you have Node.js and npm installed.
 - Make sure you have filled in the database URL correctly in the `.env` file.
 - Choose between `npx prisma db push` or `npx prisma migrate dev --name initial` based on your needs.
 - Ensure that TypeScript and ESLint are properly configured in your project.

 ## Final Words
 Thank you for using this template! I hope it helps you.
