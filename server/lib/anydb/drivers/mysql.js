const mysql = require('mysql');
const util = require('util');

module.exports = class OracleDriver { 
    
    static getResourceFactory(config) { 
        return  { 
                create:  function() {
                  const c =  mysql.createConnection(config);
                 // c.connect() ;
                  return c ;
                },
                destroy: async function(client) {
                  await client.end();
                }
              }
           
        }

        
        static async  query(conn,stm,params,options) {
          
          return new Promise((resolve,reject) => { 
            return conn.query(stm,function(error,result,fields){
              if(error) {
                console.error(error.message)
                reject(error.message)
              }
                else {
                  resolve(result)
                }
            })
          } )
       
  }
}