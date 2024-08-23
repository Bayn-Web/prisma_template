"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRestfulAPIs = void 0;
const utils_1 = require("../utils");
/**
 * Generates RESTful APIs for a given Prisma model.
 */
const generateRestfulAPIs = (router, prisma, modelName) => {
    const model = prisma[modelName];
    // GET /modelName
    router.get(`/${modelName}`, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield model.findMany();
        ctx.body = data.map((item) => (0, utils_1.formatDateTime)(item, ctx.headers.timezone));
    }));
    // GET /modelName/:id
    router.get(`/${modelName}/:id`, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(ctx.params.id);
        const data = yield model.findUnique({ where: { id } });
        if (!data) {
            ctx.status = 404;
            return;
        }
        ctx.body = (0, utils_1.formatDateTime)(data, ctx.headers.timezone);
    }));
    // POST /modelName
    router.post(`/${modelName}`, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield model.create({ data: ctx.request.body });
            ctx.status = 201;
            ctx.body = (0, utils_1.formatDateTime)(data, ctx.headers.timezone);
        }
        catch (_a) {
            ctx.status = 400;
            ctx.body = { error: "Check if something is already in use." };
        }
    }));
    // PUT /modelName/:id
    router.put(`/${modelName}/:id`, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(ctx.params.id);
        try {
            const data = yield model.update({
                where: { id },
                data: ctx.request.body,
            });
            ctx.body = (0, utils_1.formatDateTime)(data, ctx.headers.timezone);
        }
        catch (_a) {
            ctx.status = 400;
            ctx.body = { error: "Invalid request body or ID" };
        }
    }));
    // DELETE /modelName/:id
    router.delete(`/${modelName}/:id`, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(ctx.params.id);
        yield model.delete({ where: { id } });
        ctx.body = "deleted";
    }));
};
exports.generateRestfulAPIs = generateRestfulAPIs;
