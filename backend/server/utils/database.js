const config = require('../config/config.json');
const mysql = require('mysql2');

const db = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
});


module.exports = db.promise();