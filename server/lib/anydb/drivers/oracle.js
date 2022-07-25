const oracledb = require('oracledb');
const util = require('util');

module.exports = class OracleDriver { 
    
  static getResourceFactory(config) { 
        return  { 
               create:  function() {
                
                  return oracledb.getConnection(config);
                },
                destroy: async function(client) {
                  await client.close();
                }
            }
        }

  static  async createPool(config) {
      return await oracledb.createPool(config)
  }

  static async getConnection(alias) {
    return await oracledb.getConnection(alias);
  }

  static async  query(conn,stm,params,options) { 
    console.log(conn)
            const result = await conn.query(stm,params,{   outFormat: oracledb.OBJECT }) ;
            return result.rows;
  }

}