'use strict'
const find = require("find")
const fs = require("fs")
const JsYaml = require("js-yaml");
const path = require("path");

 class QueryManager { 
  name="QueryManager"
  inventoryJson = {} ;
  files = []
  constructor() {
   
  }

  load() {
       this.files = find.fileSync(/\.(yaml|yml)$/, process.env.CQP_INVENTORY);//.map(e=> e.replace(process.env.CQP_INVENTORY,'').replace(/^[\\\/]/g,""));
        this.files.forEach(e => {
          this.inventoryJson[e] = JsYaml.load(fs.readFileSync(e,'utf8'))
       });
       return this.inventoryJson;

  }
}

module.exports = new QueryManager();