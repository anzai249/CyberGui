const mysql = require('mysql');
const secret = require('../secret.json').mysql;
const { getDate } = require('../modules/date');

const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const connection = mysql.createConnection({
  host: "localhost",
  user: secret[env].username,
  password: secret[env].password,
  database: "cybergui",
  // auto handle reconnect
  reconnect: true
})

function connect() {
  const query = require('./query')(connection);
  console.log("Connected to database at " + getDate());
  connection._query = connection.query;
  connection.query = query;
  connection.user = require('./user.js');
  return connection;
}

module.exports = {
  connect,
}