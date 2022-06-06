//

const directives = require("./directives");
const _ = require('lodash');
const  Executers = ["shell","api","result","cmd","sql","plsql"];
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

    async execute(qObject,params={literal:'literal',limit:3},session) {
        const Executer = directives[qObject.config.executer];
        const executer = new Executer(this.fastify);
        return {result: await executer.execute(qObject.config,params,session),
                cols:qObject.config.cols
            };
    }
}

module.exports = new Executer();