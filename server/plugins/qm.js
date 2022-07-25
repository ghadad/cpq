'use strict'

const fp = require('fastify-plugin');
// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope
const QueryManager = require('../services/QueryManager');



module.exports = fp(async function (fastify, opts) {
  const qm = new QueryManager(fastify); 
  await fastify.decorate('QueryManager', qm);
})
