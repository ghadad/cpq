var shell = require('shelljs');
const _ = require('lodash');
class Shell {

    executer = true
    constructor(fastify){
        this.fastify = fastify
    }
    
    async execute(config) { 
        let result =  await this.invokdeShell(config);
       
        if(config.convert) { 
                 return this.convert(result,config)   
           }
    }

    async invokdeShell(config) {
        let self = this;
        return new Promise(function(resolve,reject)  { 
                let shellCommand =  self.normalize(config.shell);
                shell.exec(shellCommand, function(code, stdout, stderr) {
                    if(code !=0) { 
                        return reject("shell exit with status :" + code) ;
                    }
                   if(stderr) { 
                    return reject("shell has failed : "+stderr);
                   }
                   if(stdout) { 
                    return resolve(stdout)
                   } else { 
                    return reject("invokde shell directive must return output ! ");
                   }
               });
            })

            
    }

   static validate(val) {
        return (typeof val === 'string' || Array.isArray(val)) ;
    }

    
    normalize(val) {
        if (typeof val === 'string') 
            return val ;
        // is Array 
        return val.join(" ");
    }

    convert(data,config) { 
        let convertConfig = config.convert
        let result ;
        if(convertConfig.type == "table") {
            result =data.split(new RegExp(convertConfig.newline)).map(e=>e.split(new RegExp(convertConfig.delim)))

        }
        
        if(convertConfig.type == "json") {
            result =data
            .split(new RegExp(convertConfig.newline))
            .map(e=>e.split(new RegExp(convertConfig.delim))
                                .map((e,index) => { 
                                    let obj = {};
                                    obj[config.cols[index]] = e;
                                    return  obj ;
                                 })
                           )
                
        }
        return result;
    }
}

module.exports = Shell;