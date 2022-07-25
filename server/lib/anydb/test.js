const AnyDB = require("./");
const config = require("../../config/development")
const pAll = require('p-all');

const dbs = {}

const run  = async function(db,stm,total=10) { 
        const driver = new AnyDB(config.dbs[db])

        dbs[db] = driver ;

        console.time("test:"+db)
        const promises = [];
        for(let i = 1; i<total ; i++ ) {
            promises.push(() => dbs[db].query(stm))
        }


        const finalResult =  await pAll(promises, {concurrency: 2});
        console.log(db,finalResult)

        console.timeEnd("test:" +db)
        //process.exit(0)
}

run("oracle",`Select * from employees where rownum <3`,20);
//run("mysql","Select 1 from dual",2);

setTimeout(()=>process.exit(0),4000)
//run("postgres");

// set environment : 
// ORACLE_HOME 
// TNS_ADMIN=wallet path
// edit wallt - sqlnet.ora to point the wallet file properly 
// LD_LIBRARY_PATH = $ORACLE_HOME