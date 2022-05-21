"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUT = exports.GET = void 0;
const GET = async (req) => {
    return { userId: req.params.id };
};
exports.GET = GET;
const PUT = async (req) => {
    req.log.info(`updating user with id ${req.params.id}`);
    return { message: 'user updated' };
};
exports.PUT = PUT;
//# sourceMappingURL=%5Bid%5D.js.map