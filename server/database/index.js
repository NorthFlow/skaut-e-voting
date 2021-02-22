const mysql = require('mysql');

// Create connection
var db_config = {
    port        :'3313',
    host        :'mariadb103.websupport.sk',
    user        :'skautvoting',
    password    :'SkautVoting2021',
    database    :'skautvoting'  
};

//- Create the connection variable
var connection = mysql.createConnection(db_config);

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

let userdb = {};

// ---- login an users sequence
userdb.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users`, (err, results) => {
            if (err) {
                return reject(err);
            } 
            return resolve(results);
        });
    })

}

userdb.login = (login, password) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user`, [login],(err, result) => {
            if (err) {
                throw err
            }   
            if (result == undefined || result == null || result == '' ) {
                // console.log("Invalid password or login !");
                reject( 'Invalid password or login');
            } else {
                if ( result[0].password == password ) {
                    delete result[0].osobne_data_id;    //duplicate value
                    delete result[0].role_id;           // need only name
                    resolve(result[0]);    
                } else {
                    // console.log("Invalid password!");
                    reject( 'Invalid password');
                }
            }   
        });
    })
}


// --- voting sequence
userdb.getAllQuestions = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM questions`, (err, results) => {
            if (err) {
                return reject(err);
            } 
            return resolve(results);
        });
    })

}

module.exports = userdb;