const assert = require('assert');
const AssertionError = assert.AssertionError ;
const Executer = require("./Executer");
const directives = require("./directives");
const _ = require("lodash");

class  Validator { 
    validate (config) { 
        config = this.normalize(config);
        let result  = {valid:true,config:config}; 
        try {
            if(config.shell)  assert.ok(directives.shell.validate(config.shell),"shell directive is invalid");
            if(config.result)  assert.ok( directives.result.validate(config.result),"result directive is invalid");
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
        let cols = config.cols || config.columns ;
        let normalCols  =  [];
        let picks = [];

        cols.forEach(function(c) { 
          let cObject  = {} ;
          if(typeof c == "object") { 
            cObject.value = c.value || c.name;
            cObject.text = c.text || c.title || c.header || cObject.value;
          } else { 
            cObject.text = c ;
            cObject.value = c ;
          }
          normalCols.push(cObject);
          picks.push(cObject.value);
        })
        
        
        return Object.assign(config,{description:config.desc|| config.description,cols:normalCols,picks:picks,executer:executer})
      }

}

module.exports =  new Validator();