'use strict'

var util = require("util")
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
   let result =  await fastify.db.raw("select :literal as literal , sample.* from sample limit :limit",{limit:3,literal:'banana',sasasas:123});
   return result[0];
  })
}
