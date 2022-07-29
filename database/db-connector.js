// Citation starter code:
//  Date: 7/28/22
//  Adapted from:
// #Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_pruittad',
    password        : '8021',
    database        : 'cs340_pruittad'
})

// Export it for use in our applicaiton
module.exports.pool = pool;