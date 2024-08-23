import bodyParser from 'koa-bodyparser';
import Koa from "koa";
import { router } from "../router/index";
export const useMiddleWare = (app: Koa<Koa.DefaultState, Koa.DefaultContext>): Koa<Koa.DefaultState, Koa.DefaultContext> => {
  app.use(bodyParser());
  // 中间件用于统一错误处理
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.error('Error:', err);
      ctx.status = 500;
      ctx.body = `An error occurred: ${err}`;
    }
  });
  // 注册路由
  app.use(router.routes());
  // 中间件用于兜底404错误处理
  app.use(async (ctx) => {
    if (ctx.status === 404) {
      ctx.body = '404 Not Found. Try something else';
    }
  });
  app.use(router.allowedMethods());
  return app;
};