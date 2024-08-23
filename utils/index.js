"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTime = formatDateTime;
// 国际化日期格式化
function formatDateTime(body, TimeZone) {
    var _a;
    return Object.assign(Object.assign({}, body), { createdAt: (_a = body.createdAt) === null || _a === void 0 ? void 0 : _a.toLocaleString(TimeZone == "CN" ? "zh-CN" : "en-US", { timeZone: TimeZone == "CN" ? "Asia/Shanghai" : "America/New_York" }) });
}
