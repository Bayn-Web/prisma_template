import { Prisma, PrismaClient } from '@prisma/client';
import Router from 'koa-router';
import { generateRestfulAPIs } from "../hooks/index";

const prisma = new PrismaClient();
const router = new Router();

generateRestfulAPIs(router, prisma, "user");

// 创建用户资料
router.post('/profile', async (ctx) => {
  const { bio, userId } = ctx.request.body as Prisma.ProfileCreateManyInput;
  try {
    await prisma.profile.create({ data: { bio, userId: userId } });
    ctx.body = "Profile created successfully.";
  } catch {
    ctx.status = 404;
    ctx.body = "User not found.";
  }
});

type FromBodyOrParams<T extends object> = T & {
  [K in keyof T]: string;
};

// 创建文章
router.post('/post', async (ctx) => {
  const body = ctx.request.body as FromBodyOrParams<Prisma.PostCreateManyInput>;
  try {
    await prisma.post.create({ data: { ...body, authorId: parseInt(body.authorId) } });
    ctx.body = "post created successfully.";
  } catch {
    ctx.status = 404;
    ctx.body = "User not found.";
  }
});

export { router, prisma };