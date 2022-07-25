const oracledb = require("oracledb");

const knex = require("knex")({
    client: "oracledb",
    connection: {
        user: "admin",
        password: "Datareactor1971!",
        connectString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.eu-frankfurt-1.oraclecloud.com))(connect_data=(service_name=n5zybe7fehilell_db20220715195354dd_medium.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adwc.eucom-central-1.oraclecloud.com, OU=Oracle BMCS FRANKFURT, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))',
        requestTimeout: 100,
	externalAuth:false
    },
    fetchAsString: ["clob"]
});



const run = async () => 
{ 
    console.log(await knex.raw("select * From customers"));
    process.exit(0)
}

run();
