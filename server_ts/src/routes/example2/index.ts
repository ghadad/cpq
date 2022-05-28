import { FastifyPluginAsync } from "fastify"

const example2: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return 'this is an ddddddddasssssssssssssssss'
  })
}

export default example2;
