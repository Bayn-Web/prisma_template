import Koa from 'koa';
import { prisma } from "./router/index";
import { useMiddleWare } from "./middleWare/index";

let app = new Koa();
app = useMiddleWare(app);
// 错误处理
app.on('error', async (err, ctx) => {
  console.error('Server Error:', err, ctx);
});

// 断开 Prisma 连接
app.on('close', async () => {
  await prisma.$disconnect();
});

// 启动应用
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});