module.exports=  {
    "dbs":{
         oracle:
         {    
         client:"oracledb",
         connection: { 
           user: "cpq",
            password: "cpq",
            connectString:"oracle-xe/XE",
        }
        ,pool :{
           min:3,
           max:10 ,  
        },
          fetchAsString: ["clob"]
      },
        mysql:{
          client:"mysql",
          connection: {
            host : 'mysql', 
            port : 3306,
            user : "cpquser",
            password : "cpqpass",
            database :  "employees" 
          },pool :{ 
            acquireTimeoutMillis:4000,
            min:2,
            max:10,
          } 
      },

    }
  }


