'use strict'
let oracledb = require('oracledb');
const config = require("../config/development")




async function test () {

  console.log("connect config:",config.dbs.oracle.connection)
  
  let pool = await oracledb.createPool(config.dbs.oracle.connection);
  
  let c = await pool.getConnection() ;
  console.log(await c.execute("select sysdate from dual"))
  console.timeEnd("execute")
}



module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    //await test() ;
    return { root: true }
  })
}
