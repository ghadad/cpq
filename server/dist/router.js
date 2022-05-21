"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("./controller/userController"));
const indexController_1 = __importDefault(require("./controller/indexController"));
async function router(fastify) {
    fastify.register(userController_1.default, { prefix: "/api/v1/user" });
    fastify.register(indexController_1.default, { prefix: "/" });
}
exports.default = router;
//# sourceMappingURL=router.js.map