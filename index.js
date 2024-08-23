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
const koa_1 = __importDefault(require("koa"));
const index_1 = require("./router/index");
const index_2 = require("./middleWare/index");
let app = new koa_1.default();
app = (0, index_2.useMiddleWare)(app);
// 错误处理
app.on('error', (err, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.error('Server Error:', err, ctx);
}));
// 断开 Prisma 连接
app.on('close', () => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.prisma.$disconnect();
}));
// 启动应用
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
