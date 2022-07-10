module.exports=  {
    "dbs":{
        db1:{
            client: 'mysql',
            connection: {
               host : 'mysql',
              port : 3306,
              user : process.env.MYSQL_USER,
              password : process.env.MYSQL_PASSWORD,
              database :  process.env.MYSQL_DATABASE
            },
            postProcessResponse: (result, queryContext) => {
                // TODO: add special case for raw results 
                // (depends on dialect)
                if (Array.isArray(result)) {
                  return result.map(row => row);
                } else {
                  return result;
                }
              }
        }
    }
}

