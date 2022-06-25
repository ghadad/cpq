import httpClient from '@/http';
const actions  = {
  activeParamsChange() {
      this.enableQueries();
  },
  resultChange() { 
    const activeParams = {};
    this.setActiveParams({});
    
    for(const r of this.$state.resultSet) {
      if(!(r.activeRow>=0 && r.tableData[r.activeRow]))
        continue;

       let  ParamsObject =  Object.keys(r.tableData[r.activeRow]).filter(key => !( key.indexOf('$') ==0) ).reduce((obj, key) =>  {
            let newkey = key.toLowerCase();
            obj[newkey] = r.tableData[r.activeRow][key];
            let hasAlias  = this.$state.aliases[key] ;
            if(hasAlias)
              obj[hasAlias] =  obj[newkey] ;

            return obj;
        }, {});
        
        this.addActiveParams(ParamsObject);
    }

  },
    calculateActiveParams(activeParams) {
        
    },
    clearResultSet() {
      this.$state.resultSet  = [];
    },
    addResultSet(result) {
      if(!this.$state.resultSet)
          this.$state.resultSet = [];
      this.collapse();
      this.$state.resultSet.push(result);
      this.$state.lastInsertedIndex = this.$state.resultSet.length-1;
    },
    setSection(section) {
      this.$state.section  = section;
    },
    setDB(db) {
      this.$state.db  = db;
    },
    clear() { 

    },
    collapse(){
      for(let r of  this.$state.resultSet) {
        r.collapse = true;
      }
    },
    toggle(index) {
      if(!this.$state.resultSet[index])
      return ;
      this.$state.resultSet[index].collapse = !this.$state.resultSet[index].collapse
    },
    addActiveParams(params){
      let  ParamsObject =  Object.keys(params).filter(key => !( key.indexOf('$') ==0) ).reduce((obj, key) =>  {
        let newkey  = key.toLowerCase();
        obj[newkey] = params[key];
        let hasAlias  = this.$state.aliases[key] ;
        if(hasAlias)
          obj[hasAlias] =  obj[newkey] ;

        return obj;
    }, {});

       Object.assign(this.$state.activeParams,ParamsObject);
    },

    setActiveParams(params){
      this.$state.activeParams =  params;
      console.log(this.$state.activeParams)
    },
    activateRow(resultIndex,rowIndex) { 
      const tableData = this.$state.resultSet[resultIndex]?.tableData ;
      for(let i=0 ; i< tableData.length ;i++ ) {
        if(i==rowIndex) {
          tableData[i].$active = true;
          this.addActiveParams( tableData[i])
        }
         else 
         tableData[i].$active = false;
      }
      this.$state.resultSet[resultIndex].activeRow = rowIndex;
      this.remove(resultIndex+1) ;
    },
    remove(index) {
      if(!this.$state.resultSet[index])
      return ;
      this.$state.resultSet.splice(index,this.$state.resultSet.length-index);
      this.$state.lastInsertedIndex = this.$state.resultSet.length-1;
      this.calculateActiveParams();
    },
    setActiveDb(db:String) {
      this.$state.db = db ;
    },
    async fetchAll(force=false) {
      if(force == false && this.$state.sections.length>0)
        return ;
      const res = await httpClient.get("http://localhost:8000/qmanager/list")
      this.$state.inventory  = res.data.inventory;
      this.$state.sections  = res.data.sections;
      this.$state.starters  = res.data.starters;
      this.$state.aliases  = res.data.aliases;
    }  ,
   
   async executeQueryFromResult(qKey, resultIndex, rowIndex, options = {starter:false}) {
    this.activateRow(resultIndex, rowIndex);
     await this.executeQuery(qKey, options);
   },

   async executeQuery(qKey,  options = {starter:false}) {
    let error  ;
    const res:any = await httpClient.post("http://localhost:8000/qmanager/exec/"+qKey,this.$state.activeParams)
    .catch(e => {
      if(e.response) {
        error = {statusCode:e.response.data.statusCode,message:"execute :[" + qKey +"] "+e.response.data.message}
      } else if (e.request){ 
        error = {message:"execute :[" + qKey +"] "+ e.request.AxiosError}
      } else  { 
        error = e 
      }
      }
    );


    if(!error && options.starter) {
      this.clearResultSet();
    }

  if(error)
      this.addResultSet( {qKey:qKey,...error});
      else {
        let foundResult = false;
        for(let i = 0 ;  i< this.$state.resultSet.length ;i++) {
          if(qKey == this.$state.resultSet[i].qKey) {
            this.$state.resultSet[i] = {qKey:qKey ,...res.data};
            foundResult = true ;
            this.remove(i+1) ;
            break;
          }
        }
        if(!foundResult)
        this.addResultSet( {qKey:qKey ,...res.data});
      }

   },

   enableQueries() {
    for (const [qkey, qVal] of Object.entries(this.$state.inventory)) {
       qVal.enabled =  qVal.config.paramsList.every( p=> this.$state.activeParams[p]) ? true :false ;
    }
   }
  } ;

  export default  actions;
