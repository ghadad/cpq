import app from "./app";

console.log(process.env.SERVER_PORT)
const FASTIFY_PORT =  Number(process.env.SERVER_PORT) || 3006;

app.listen(FASTIFY_PORT,'0.0.0.0');

console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
console.log(`Route index:  /`);
console.log(`Route user: /api/v1/user`);
