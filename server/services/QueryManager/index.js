'use strict'
const find = require("find")
const fs = require("fs")
const JsYaml = require("js-yaml");
const path = require("path");
const { push } = require("shelljs/commands");
const Validator = new require("./Validator");
const Executer = new require("./Executer");


 class QueryManager { 
  name="QueryManager"
  inventoryJson = {} ;
  files = []
  constructor(fastify) {
   this.load();
   this.fastify = fastify ;
  }

  load() {
        const sections =  [];
       this.files = find.fileSync(/\.(yaml|yml)$/, process.env.CQP_INVENTORY);
        this.files.forEach(e => {
          let key = e.replace(process.env.CQP_INVENTORY,'').replace(/^[\\\/]/g,"").replace(/[\/\\]/g,":").replace(/\.(yaml|yml)$/,'')
          let [section,dum] = key.split(":");
          if(!sections.includes(section))
            sections.push(section);
          this.inventoryJson[key] =Validator.validate(JsYaml.load(fs.readFileSync(e,'utf8')))
       });
       return { inventory : this.inventoryJson ,sections :sections };
   }

   get qInventory() {
    return this.inventoryJson;
   }

   async execute(qkey,params={},sessionParams={db:"db1"}) {
     if(!(qkey in this.inventoryJson) ) {
       throw new Error("sqky " + qkey + " doesn't found in qinvetory")
     }
     Executer.setFastify(this.fastify);
     return await Executer.execute(this.inventoryJson[qkey],params,sessionParams);
   }
}

module.exports = QueryManager ;