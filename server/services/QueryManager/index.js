'use strict'
const find = require("find")
const fs = require("fs")
const JsYaml = require("js-yaml");
const path = require("path");
const Validator = new require("./Validator");
const Executer = new require("./Executer");


 class QueryManager { 
  name="QueryManager"
  inventoryJson = {} ;
  files = []
  constructor() {
   this.load();
  }

  load() {
       this.files = find.fileSync(/\.(yaml|yml)$/, process.env.CQP_INVENTORY);
        this.files.forEach(e => {
          let key = e.replace(process.env.CQP_INVENTORY,'').replace(/^[\\\/]/g,"").replace(/[\/\\]/g,":").replace(/\.(yaml|yml)$/,'')
          this.inventoryJson[key] =Validator.validate(JsYaml.load(fs.readFileSync(e,'utf8')))
       });
       return this.inventoryJson;
   }

   get qInventory() {
    return this.inventoryJson;
   }

   async execute(qkey,params={}) {
     if(!(qkey in this.inventoryJson) ) {
       throw new Error("sqky " + qkey + " doesn't found in qinvetory")
     }
     
     return await Executer.execute(this.inventoryJson[qkey]);
   }
}

module.exports = new QueryManager();