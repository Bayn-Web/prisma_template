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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.router = void 0;
const client_1 = require("@prisma/client");
const koa_router_1 = __importDefault(require("koa-router"));
const index_1 = require("../hooks/index");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const router = new koa_router_1.default();
exports.router = router;
(0, index_1.generateRestfulAPIs)(router, prisma, "user");
// 创建用户资料
router.post('/profile', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { bio, userId } = ctx.request.body;
    try {
        yield prisma.profile.create({ data: { bio, userId: userId } });
        ctx.body = "Profile created successfully.";
    }
    catch (_a) {
        ctx.status = 404;
        ctx.body = "User not found.";
    }
}));
// 创建文章
router.post('/post', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const body = ctx.request.body;
    try {
        yield prisma.post.create({ data: Object.assign(Object.assign({}, body), { authorId: parseInt(body.authorId) }) });
        ctx.body = "post created successfully.";
    }
    catch (_a) {
        ctx.status = 404;
        ctx.body = "User not found.";
    }
}));
