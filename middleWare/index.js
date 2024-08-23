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
exports.useMiddleWare = void 0;
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const index_1 = require("../router/index");
const useMiddleWare = (app) => {
    app.use((0, koa_bodyparser_1.default)());
    // 中间件用于统一错误处理
    app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield next();
        }
        catch (err) {
            console.error('Error:', err);
            ctx.status = 500;
            ctx.body = `An error occurred: ${err}`;
        }
    }));
    // 注册路由
    app.use(index_1.router.routes());
    // 中间件用于兜底404错误处理
    app.use((ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (ctx.status === 404) {
            ctx.body = '404 Not Found. Try something else';
        }
    }));
    app.use(index_1.router.allowedMethods());
    return app;
};
exports.useMiddleWare = useMiddleWare;
