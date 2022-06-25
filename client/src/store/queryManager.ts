import { defineStore } from 'pinia'
import actions  from './actions';
import getters from './getters';

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
      activeParams : {}  ,
      databases :['alpha','ea','production']   ,
      resultSet :[],
      lastInsertedIndex:0 ,
      aliases:{}
    }} ,

  persist: true,
  getters,
  actions
})



