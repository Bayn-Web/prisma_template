# Prisma + Koa + MySQL + TypeScript + Eslint 模板

[English](https://github.com/Bayn-Web/prisma_template/blob/main/Readme.en.md)

本模板提供了使用 Prisma、Koa、MySQL、TypeScript 和 Eslint 构建项目的快速入门指南。

## 快速开始

### 1. 安装依赖

- 运行 `npm install` 来安装项目所需的依赖包。

### 2. 初始化 Prisma

- 运行 `npx prisma init` 来创建 `prisma/schema.prisma` 文件和 `.env` 文件。
- 在 `.env` 文件中填写数据库 URL。

### 3. 创建或迁移数据库

- 如果你需要从零开始创建数据库结构，运行 `npx prisma db push --schema ./prisma/schema`。
- 如果你已经有数据在数据库中，并希望保留现有数据的同时更新数据库结构，运行 `npx prisma migrate dev`。

### 4. 启动服务

- 运行 `npm run dev` 来启动开发环境的服务。

---

## 详细步骤

### 1. 安装依赖

- 打开终端或命令行工具。
- 进入项目目录。
- 运行 `npm install` 来安装项目所需的依赖包。

### 2. 初始化 Prisma

- 运行 `npx prisma init` 来创建 `prisma/schema.prisma` 文件和 `.env` 文件。
- 在 `.env` 文件中填写数据库 URL，例如：

  ```plaintext
  DATABASE_URL="mysql://username:password@localhost:3306/database_name?charset=utf8mb4"
  ```

### 3. 创建或迁移数据库
- 如果你需要从零开始创建数据库结构，运行 npx prisma db push。
- 如果你已经有数据在数据库中，并希望保留现有数据的同时更新数据库结构，运行 npx prisma migrate dev --name initial。

### 4. 启动服务

- 运行 `npm run dev` 来启动开发环境的服务。

### 注意事项

- 确保你已安装 Node.js 和 npm。
- 确保在 .env 文件中正确填写了数据库 URL。
- 根据实际情况选择 npx prisma db push 或 npx prisma migrate dev --name initial。
- 确保项目中已配置好 TypeScript 和 ESLint 等工具。

## 最后

感谢你的使用，希望此模板能帮助到你。
