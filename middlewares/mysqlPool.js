//use mysql
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig.js');
var pool = mysql.createPool(dbconfig('mysql').local);

module.exports = {pool: pool};
