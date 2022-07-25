'use strict'

var util = require("util")
module.exports = async function (fastify, opts) {
  fastify.get('/:key', async function (request, reply) {
     return await fastify.QueryManager.execute(request.params.key,{limit:3,literal:"literal"},{db:"oracle"});
  })

  fastify.post('/:key', async function (request, reply) {
   console.log(request.body)
    return await fastify.QueryManager.execute(request.params.key,request.body,{db:"db1"});
 })
}
