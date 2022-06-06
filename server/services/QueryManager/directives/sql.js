var fastify = require('fastify');
const _ = require('lodash');
class Sql {
    executer = true

    constructor(fastify){
        this.fastify = fastify
    }
    
    async execute(config,params,session) { 
        let result =  await this.fastify.dbs[session.db].raw(config.sql,params)
        return result[0];
    }


    static validate(val) {
       return true;
    }
   
    normalize(val) {
        if (typeof val === 'string') 
            return val ;
        // is Array 
        return val.join(" ");
    }

}

module.exports = Sql ;