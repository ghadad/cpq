'use strict'

var util = require("util")
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    console.log(util.inspect(fastify.qsrv))
    return 'this is an example' + fastify.QueryManager.load()
  })
}