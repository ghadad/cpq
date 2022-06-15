import { defineStore } from 'pinia'
import httpClient from '@/http';

export const useQueryManagerStore = defineStore('queryManager',{
  state: () =>  {
    return  { 
      db:"",
      inventory: {} ,
      last: [] ,
      section:"",
      sections:[],
      starters:{},
      activeQuery : {} ,
      activeParamaters : {}  ,
      databases :['alpha','ea','production']   ,
      resultSet :[],
      lastInsertedIndex:0      
    }} ,

    persist: true,

  getters: {
    getDB(){
      return this.db;
    },
    getSection() {
      return this.section;
    },
    getSectionStarters() { 
      return this.starters[this.section]
    },
    list(){
      return this.inventory;
    },
    lastResult() { 
      return this.last ;
    } ,

    getResultSet() { 
      return this.resultSet;
    } ,
    
    getApiClient() { 
      return (qk) => httpClient.post("http://localhost:8000/qmanager/exec/"+qk);
    },
    getActiveParams() { 
      return this.activeParamaters;
    }
  },

  actions: {
    computeActivePArams() {
      this.$state.activeParamaters  = [];
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
      
      this.computeActivePArams();

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
      this.$state.resultSet[index].collapse = !this.$state.resultSet[index].collapse
    },
    remove(index) {
      this.$state.resultSet.splice(index,this.$state.resultSet.length-index);
      this.$state.lastInsertedIndex = this.$state.resultSet.length-1;
      this.computeActivePArams();
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

    }
   ,
   async executeQuery(qKey,params={} ,  options = {starter:false}) {
    let error  ;
    const res:any = await httpClient.post("http://localhost:8000/qmanager/exec/"+qKey)
    .catch(function (error) {
      if (error.response) {
       // console.log(error.response.data);
     //   console.log(error.response.status);
    //    console.log(error.response.headers);
      //  error = error.response.data
      }
    });

    if(options.starter) {
      this.clearResultSet();
    }

    if(error)
      this.$state.addResultSet( {error});
      else 
      this.addResultSet( res.data);

  },
   enableQueries() {

      
   }
  }
})