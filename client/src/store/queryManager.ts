import { defineStore } from 'pinia'
import httpClient from '@/http';

export const useQueryManagerStore = defineStore('queryManager',{
  state: () => {
    return  {
    db:"",
    inventory: {} ,
    last: [] ,
    sections:[],
    activeQuery : {} ,
    activeParamaters : {}     
  }},

  getters: {
    list(){
      return this.inventory;
    },
    lastResult() { 
      return this.last ;
    } ,
    getApiClient() { 
      return (qk) => httpClient.post("http://localhost:8000/qmanager/exec/"+qk);
    },
    getActiveParams() { 
      return this.activeParamaters;
    }
  },

  actions: {
    clear() { 

    },
    setActiveDb(db:String) {
      this.$state.db = db ;
    },
    async fetchAll() {
      if(this.$state.sections.length>0)
      return ;
      const res = await httpClient.get("http://localhost:8000/qmanager/list")
      this.$state.inventory  = res.data.inventory;
      this.$state.sections  = res.data.sections;
    }
   ,
   async executeQuery(qk:String) {
    const res = await httpClient.post("http://localhost:8000/qmanager/exec/"+qk)
    this.$state.last  = res.data;
  },
   enableQueries() {

      
   }
  }
},  {
  persist: true,
},)