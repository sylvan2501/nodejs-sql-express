const dv=require('dotenv')
dv.config()
const mysql = require('mysql')
const connection = mysql.createConnection({
	host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'db_example'
})

connection.connect((err) =>{
    if(err) throw err
    else {console.log('Successfully connected !!')}
})

module.exports = connection