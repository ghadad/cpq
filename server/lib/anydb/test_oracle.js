let oracledb = require('oracledb');
const config =   {
  user: 'admin',
  password: 'Datareactor1971!',
  connectString: 'db20220715195354dd_medium',
  poolMax: 10,
  poolMin: 2,
  poolIncrement: 1,
  poolTimeout: 0,
  poolAlias: 'oracle'
}




async function test () {

  console.log("connect config:",config)
  console.time("createPool")
  let pool = await oracledb.createPool(config);
  console.timeEnd("createPool")   
  console.time("getConnection")
  let c = await pool.getConnection() ;
  console.timeEnd("getConnection")
  console.time("execute")
  console.log(await c.execute("select sysdate from dual"))
  console.timeEnd("execute")
}

test();