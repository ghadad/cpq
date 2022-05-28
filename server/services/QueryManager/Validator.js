const assert = require('assert');
const AssertionError = assert.AssertionError ;
const Executer = require("./Executer");
const directives = require("./directives");

class  Validator { 
    validate (config) { 
        config = this.normalize(config);
        let result  = {valid:true,config:config}; 
        try { 
            assert.ok(config.result && directives.result.validate(config.result),"result directive is invalid");
            assert.ok(config.cols &&  Array.isArray(config.cols) == true,"cols directive missing or does not array");
            assert.ok(Object.keys(config).length>0,"No config found");
            assert.ok(config.description  ,"No description found");
            assert.ok(config.name ,"No name found");
        } catch(err) { 
            result =  {valid:false,err:err,config:config}
        }
        return result;
    }

    normalize(config) {
        let executer = Executer.getExecuter(config);
        return Object.assign(config,{description:config.desc|| config.description,cols:config.cols || config.columns,executer:executer})
      }

}

module.exports =  new Validator();