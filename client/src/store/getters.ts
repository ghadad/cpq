
    import httpClient from '@/http';
    
    const getters = {
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
        return this.queries;
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
        return this.activeParams;
        } ,
        getQueryInfo(k) { 
        return (k) => {
            if(k in this.queries)
            return this.queries[k];
            return null;
        }
        
        } 
  } ;




  export default  getters ;