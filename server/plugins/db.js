'use strict'

const fp = require('fastify-plugin')
const AnyDB = require('../lib/anydb')
const knex = require("knex");


async function initAllDbs(options) {
  const dbs =  {} ; 
    for(let db in  options.dbs)   { 
      console.log("connect db: " +db)

      dbs[db] = knex(options.dbs[db]);
       // const driver =   new AnyDB(options.dbs[db]);
     //   await driver.init()  
       // await driver.query("select 1 from dual ") ; 

     /*    try { 
          await  dbs[db].query("select 1 from dual")
          .then(r=>console.log("check db:"+db,r));
        } catch(e) { 
          console.error("check :"+db , e )
        }
        */
    }   
    console.log(dbs)
    return dbs ;  
}

const  fastifyAnyDB =   function (fastify, options, next) {
  const dbs = initAllDbs(options).then(dbs => { 
    fastify.decorate('dbs', dbs);
    next() ;
  })
  
}
 
module.exports = fp(fastifyAnyDB, '>=0.13.1')  
