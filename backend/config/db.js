const db = require('../.env')
const mysql = require('mysql')
const connection = mysql.createConnection(db.db)
module.exports = connection