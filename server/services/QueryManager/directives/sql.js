var fastify = require('fastify');
const _ = require('lodash');
class Sql {
    name = "sql";
    executer = true
    picksToLower = true;
    
    constructor(fastify){
        this.fastify = fastify
    }
    
    async execute(config,params,session) { 
        console.log("activeParams",params);

        let result =  await this.fastify.dbs[session.db].raw(config.sql,params)
        return result[0].map(r => { 
            return Object.keys(r).reduce((acc,e) => {
                acc[e.toLowerCase()] = r[e];
                return acc ;
            },{});
        });
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

    
    static getParams(config){
        return (config.sql.match(/:\w+/g)||[]).map(e=>e.substr(1))
    }

}

module.exports = Sql ;