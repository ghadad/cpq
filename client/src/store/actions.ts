import httpClient from '@/http';
import { useTimeoutFn } from '@vueuse/core'
import { toRaw } from 'vue'
import {cloneDeep ,get} from 'lodash'



function  createQueriesBySections(list:any[]) {
  return list ;
}

const actions  = {
  activeParamsChange() {
    //console.log("changed",this.$state.activeParams)
   // this.enableQueries();
  },
  resultChange() { 
    const activeParams = {};
    let ParamsObject = {} ;
    const cloneResultSet = cloneDeep(this.$state.resultSet);
    for(const r of this.$state.resultSet) {
      if(!(r.activeRow>=0 && r.tableData[r.activeRow]))
        continue;
       let  resultParamsObject =  Object.keys(r.tableData[r.activeRow]).filter(key => !( key.indexOf('$') ==0) ).reduce((obj, key) =>  {
            let newkey = key.toLowerCase();
            obj[newkey] = r.tableData[r.activeRow][key];
            let hasAlias  = this.$state.aliases[key] ;
            if(hasAlias)
              obj[hasAlias] =  obj[newkey] ;

            return obj;
        }, {});
        
      ParamsObject = Object.assign(ParamsObject,resultParamsObject);
    }

    this.setActiveParams(ParamsObject);
  },
    calculateActiveParams() {
          this.resultChange()
    },
    clearResultSet() {
      this.$state.resultSet  = [];
    },
    addResultSet(result) {
      if(!this.$state.resultSet)
          this.$state.resultSet = [];
      if(this.$state.preferences.alwaysCollapse) this.collapse();
      this.$state.resultSet.push(result);
      this.$state.lastInsertedIndex = this.$state.resultSet.length-1;
    },
    setSection(section) {
      this.$state.section  = section;
    },
    async setDB(db:string) {
      if(this.$state.db == db)  return ;
      this.$state.db  = db;
      await this.rexecuteQueriesFromResult() ;
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
      this.enableQueries();

    },

    activateRow(resultIndex,rowIndex) { 
      let activeParams =  {} ;
      const tableData = this.$state.resultSet[resultIndex]?.tableData ;

      for(let i=0 ; i< tableData.length ;i++ ) {
        if(i==rowIndex) {
          tableData[i].$active = true;
          activeParams = Object.assign(activeParams, tableData[i]);
        }
         else 
         tableData[i].$active = false;
      }
      this.$state.resultSet[resultIndex].activeRow = rowIndex;
      this.remove(resultIndex+1) ;
      this.resultChange();
    },
    remove(index) {
      if(!this.$state.resultSet[index])
      return ;
      this.$state.resultSet.splice(index,this.$state.resultSet.length-index);
      this.$state.lastInsertedIndex = this.$state.resultSet.length-1;
      this.resultChange();
    },
    async rexecuteQueriesFromResult() { 
      let index = 0 ; 
      const activeParams = {...this.$state.activeParams };
      for(let r of [ ...this.$state.resultSet]) {
        await this.executeQuery(r.qKey);
        this.setActiveParams(activeParams);
        this.activateResultRowByParams(index);
        index++;
        console.log("index:",index)
      }
    },
    activateResultRowByParams(resultIndex) {
     let result =   this.$state.resultSet[resultIndex] ;
     console.log("result :",result.tableData)
     if(!(result && result.success))
      return ; 
      let index = 0 ;
      for(let row of result.tableData) { 
        
        if(Object.keys(row).filter(key => !( key.indexOf('$') ==0) ).every( p=> row[p] ==  this.$state.activeParams[p])){
          console.log("Active row:",resultIndex,index)
          this.activateRow(resultIndex,index);
          break;
        }
        index++;
      }
      
    },
    async fetchAll(force=false) {
      
      if(force == false && this.$state.sections.length>0)
        return ;
      const res = await httpClient.get("http://localhost:8000/qmanager/list")
      this.$state.queries  = res.data.queries;
      this.$state.queriesBySection  = createQueriesBySections(this.$state.queries) ;
      this.$state.sections  = res.data.sections;
      this.$state.starters  = res.data.starters;
      this.$state.aliases  = res.data.aliases;
      this.$state.databases  = res.data.databases;
      this.enableQueries();
    }  ,
   
   async executeQueryFromResult(qKey, resultIndex, rowIndex, options = {starter:false}) {
     this.activateRow(resultIndex, rowIndex);
     await this.executeQuery(qKey, options);
   },

   async executeQuery(qKey,  options = {starter:false}) {
    let error  ;
    let db =  this.$state.queries[qKey].db || this.$state.db;
    console.log(db)

    const res:any = await httpClient.post("http://localhost:8000/qmanager/exec/"+qKey,{...this.$state.activeParams,$db:db})
    .catch(e => {
      if(e.response) {
        console.error(e.response)
        error = {success:false ,statusCode:e.response?.data?.statusCode,message:"execute :[" + qKey +"] "+e.response.data.message}
      } else if (e.request){ 
        console.error(e.request)
        error = {success:false,message:"execute :[" + qKey +"] "+ e.request.AxiosError}
      } else  { 
        error = e 
      }
      }
    );


    if(!error && options.starter) {
      this.clearResultSet();
    }

  if(error)
      this.addResultSet( {success:false,qKey:qKey,...error});
      else {
        let foundResult = false;
        for(let i = 0 ;  i< this.$state.resultSet.length ;i++) {
          if(qKey == this.$state.resultSet[i].qKey) {
            this.$state.resultSet[i] = {success:true,qKey:qKey ,...res.data};
            foundResult = true ;
            this.remove(i+1) ;
            break;
          }
        }
        if(!foundResult)
        this.addResultSet( {success:true,qKey:qKey ,...res.data});
      }

   },

   enableQueries() {
    let now1 =  new Date() ;

    for (const [qkey, qVal] of Object.entries(this.$state.queries)) {
       qVal['enabled'] =  qVal.paramsList.every( p=> p in this.$state.activeParams) ? true :false ;
    }
    let now2 =  new Date() ;
    this.$state.paramsCalculationsMS = now2.getTime() -now1.getTime();
    this.$state.paramsChangeCounter++ ;
   }
   ,
   savePreferences(k:string,val:any) {
    this.$state.preferences[k]  = val ;
   }
  } ;

  export default  actions;
