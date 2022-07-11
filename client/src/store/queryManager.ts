import { defineStore } from 'pinia'
import actions  from './actions';
import getters from './getters';
import {watch ,toRef ,ref,toRaw} from 'vue';

export const  useQueryManagerStore = () => {
  const innerStore = defineStore('queryManager',{
    state:function () {
      return { 
        db:"",
        queries: {} ,
        queriesBySection : {} ,
        last: [] ,
        section:"",
        sections:[],
        starters:{},
        activeQuery : {} ,
        activeParams : {}  ,
        databases :['alpha','ea','production']   ,
        resultSet :[],
        lastInsertedIndex:0 ,
        aliases:{},
        paramsCalculationsMS : 0 ,
        paramsChangeCounter: 0 ,
        preferences: {
          alwaysCollapse:true
        }
      };
    } ,
  
    persist: true,
    getters,
    actions
  })

  const store = innerStore();
 //watch(toRef(store, 'resultSet'), store.resultChange,  { deep: true});
 //watch(toRef(store,'activeParams'), store.activeParamsChange,  { deep: true });
  watch(toRef(store, 'list.length'), store.activeParamsChange);
  return store;
};





