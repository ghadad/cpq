const genericPool = require("generic-pool");
const _ = require("lodash");
const oracledb  = require("oracledb");

module.exports = class AnyDb { 
    driverName;
    driver ;
    pool ;
    config;
    factory  ; 
    poolAlias ;
    constructor(dbConfig){
        this.driverName  = dbConfig.driver;
        this.driver = require("./drivers/"+ dbConfig.driver)
     
         this.config=dbConfig
          this.factory = this.driver.getResourceFactory(dbConfig.connection);
          if(dbConfig.connection.poolAlias)
          this.poolAlias = dbConfig.connection.poolAlias

    }

    async init() { 

        if( this.driverName ==="oracle"){
       
           this.pool = await oracledb.createPool(this.config.connection);
            
        } else 
        this.pool = genericPool.createPool(this.factory, this.config.pool);            
     } 

    poolInfo() { 
            // How many many more resources can the pool manage/create
            console.log("spareResourceCapacity:",this.pool.spareResourceCapacity)

            // returns number of resources in  the pool regardless of
            // whether they are free or in use
            console.log("size:",this.pool.size)
            
            // returns number of unused resources in the pool
            console.log("available:",this.pool.available)
            
            // number of resources that are currently acquired by userland code
            console.log("borrow:",this.pool.borrowed)
            
            // returns number of callers waiting to acquire a resource
            console.log("pending:",this.pool.pending)
            
            // returns number of maxixmum number of resources allowed by pool
            console.log("max:",this.pool.max)
            
            // returns number of minimum number of resources allowed by pool
            console.log("min:",this.pool.min)
    }


    
 
    async getConnection() { 

        //console.log("in getConnection",typeof oracledb.getPool(this.poolAlias))
        if(this.driverName=="oracle") {
            //console.log("in getConnection:oracle",this.poolAlias)
            //console.log(oracledb.getPool(this.poolAlias))
        if(!this.pool)  {
      //        this.pool = await oracledb.createPool(this.config.connection);
       //       console.log("created:",this.pool)      
        }
        else  {
            console.log("cached:",this.pool)      
        }
       // return await this.driver.getConnection("oracle");
       return await this.pool.getConnection( )
    }
        return await this.pool.acquire();
    }

    async query(stm="",params={},options={pager:false}) { 
        let self = this ;
       console.log("IN QUERY")
        let  conn ;   
        let result ; 
        try { 
           conn =  await self.getConnection()
           console.log("conn:",conn)
           result  =  await this.driver.query(conn,stm,{},{});
             
        } catch (err) { 
            console.log(err )
            throw new Error("AnyDB query ERROR"  ) 
        } finally { 
            if(conn){
                 if(conn.close )  conn.close();
                //await   this.pool.release(conn); 
            } 
        }

        console.log(result); 
        
        return {count:result.length , rows : result}; 
    }

    async getOne(stm="",params={},options={}) { 
        const result   = this.query(stm="",params={},options={}) ;
        const oneResult = result[0] || null;
        return oneResult;
    }

    async execute(stm="",params={},options={}) { 
        const conn =  await this.getConnection() ;
    
        const result =  await conn.execute(stm) ;
        
        if(options.commit)
        await   this.pool.release(conn);

        return result; 
    }

    async shutdown()  {
        await this.pool.drain();
        this.pool.clear();
    }

}