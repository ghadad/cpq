"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const router_1 = __importDefault(require("./router"));
const server = (0, fastify_1.default)({
    logger: !!(process.env.NODE_ENV !== "development"),
});
server.register(router_1.default);
exports.default = server;
//# sourceMappingURL=app.js.map