//

const directives = require("./directives");
const _ = require('lodash');
const  Executers = ["shell","api","result","cmd","sql","plsql","command"];
const Base = require("./base");

class Executer extends Base { 
    getExecuter(config) {
        let executer =  _.pick(config,Executers);
        let  executersNumber =  Object.keys(executer).length ;
        if(executersNumber>1) { 
            throw new Error("only one executer is allow in q config");
        }
        else if(executersNumber ==0 ) { 
            throw new Error("no executer found in q config");
        }
        return Object.keys(executer)[0];
    }

    async execute(qKey,qObject,params={literal:'literal',limit:3},session) {
        let  Executer ; 
        let  executer ;
        let  result = [];
        let error ;
        try { 
            Executer= directives[qObject.config.executer];
            executer = new Executer(this.fastify);
            result = await executer.execute(qObject.config,params,session); 
        } catch(e) { 
            error = e;
        }
        
        return {tableData:  result.map((e ,index) => Object.assign(e,{$rowId:index})),
                cols:qObject.config.cols,
                meta:qObject ,
                qKey:qKey ,
                error:error
            };
    }
}

module.exports = new Executer();