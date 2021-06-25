const mysql = require('mysql2');
const {db} = require("./config")

const con = mysql.createPool({
      database: db.name,
      password: db.pass,
      user: db.user,
      host: db.host
})
module.exports = con.promise();