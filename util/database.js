const mysql = require('mysql2'); 
 
const pool = mysql.createPool({  
    host: 'remotemysql.com',  
    user: 'OrkgSPdd8n',  
    database: 'OrkgSPdd8n',  
    password: 'cBm7yGt0W2',
    port: 3306
});  

module.exports = pool.promise(); 