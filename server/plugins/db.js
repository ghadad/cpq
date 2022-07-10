'use strict'

const fp = require('fastify-plugin')
var knex = require('knex')

async function fastifyKnex (fastify, options, next) {
    if (!fastify.db) {
    let dbs =  {} ;
    for(let db of Object.keys(options.dbs))   {
      dbs[db] =  knex(options.dbs.db1);
    // test connection 
      await  dbs[db].raw("select 1 from dual").catch((e) => next(e));
    }
    fastify.decorate('dbs', dbs)
  }
  next() ;
}

module.exports = fp(fastifyKnex, '>=0.13.1')
