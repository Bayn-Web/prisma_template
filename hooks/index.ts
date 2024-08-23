import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import Router from "koa-router";
import { ModalWithCreatedAt, formatDateTime, TimeZone } from "../utils";

// Define a generic type for the model name
type ModelName = Prisma.TypeMap["meta"]["modelProps"];

type AllCapable = {
  findMany: () => Promise<ModalWithCreatedAt[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findUnique: (SelectRules: Prisma.SelectSubset<any, any>) => Promise<ModalWithCreatedAt | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (data: Prisma.SelectSubset<any, any>) => Promise<ModalWithCreatedAt>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update: (data: Prisma.SelectSubset<any, any>) => Promise<ModalWithCreatedAt>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: (data: Prisma.SelectSubset<any, any>) => Promise<ModalWithCreatedAt>;
}

/**
 * Generates RESTful APIs for a given Prisma model.
 */
export const generateRestfulAPIs = (router: Router, prisma: PrismaClient, modelName: ModelName): void => {
  const model = prisma[modelName];

  // GET /modelName
  router.get(`/${modelName}`, async (ctx) => {
    const data = await (model as unknown as AllCapable).findMany();
    ctx.body = data.map((item: ModalWithCreatedAt) => formatDateTime(item, ctx.headers.timezone as TimeZone));
  });

  // GET /modelName/:id
  router.get(`/${modelName}/:id`, async (ctx) => {
    const id = parseInt(ctx.params.id);
    const data = await (model as unknown as AllCapable).findUnique({ where: { id } });
    if (!data) {
      ctx.status = 404;
      return;
    }
    ctx.body = formatDateTime(data, ctx.headers.timezone as TimeZone);
  });

  // POST /modelName
  router.post(`/${modelName}`, async (ctx) => {
    try {
      const data = await (model as unknown as AllCapable).create({ data: ctx.request.body });
      ctx.status = 201;
      ctx.body = formatDateTime(data, ctx.headers.timezone as TimeZone);
    } catch {
      ctx.status = 400;
      ctx.body = { error: "Check if something is already in use." };
    }
  });

  // PUT /modelName/:id
  router.put(`/${modelName}/:id`, async (ctx) => {
    const id = parseInt(ctx.params.id);
    try {
      const data = await (model as unknown as AllCapable).update({
        where: { id },
        data: ctx.request.body,
      });
      ctx.body = formatDateTime(data, ctx.headers.timezone as TimeZone);
    } catch {
      ctx.status = 400;
      ctx.body = { error: "Invalid request body or ID" };
    }
  });

  // DELETE /modelName/:id
  router.delete(`/${modelName}/:id`, async (ctx) => {
    const id = parseInt(ctx.params.id);
    await (model as unknown as AllCapable).delete({ where: { id } });
    ctx.body = "deleted";
  });
};