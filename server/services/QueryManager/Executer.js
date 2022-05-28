//

const directives = require("./directives");

class Executer { 

    getExecuter(config) {
        if(config.result && directives.result.executer) {
            return "result";
         }
         else  if(config.api && directives.api.executer) {
            return "api";
        }
    }

    async execute(qObject) {
        return {result: await directives[qObject.config.executer].execute(qObject.config),
                cols:qObject.config.cols
            };
    }
}

module.exports = new Executer();