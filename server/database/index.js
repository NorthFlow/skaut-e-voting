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
        connection.query(`SELECT * FROM users WHERE users.login = ?`, [login],(err, result) => {
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
        connection.query(`SELECT id_question AS "ID",wording AS "Znenie otázky",name AS "Názov hlasovania" FROM questions JOIN voting USING (id_voting) ORDER BY id_question ASC`, (err, results) => {
            if (err) {
                return reject(err);
            } 
            return resolve(results);
        });
    })

}
// --- return list of
userdb.getAllVotings = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id_voting AS "ID",name AS "Názov hlasovania", CASE accept_answ WHEN 0 THEN 'Nie' WHEN 1 THEN 'Áno' END AS "Hlasovanie spustené", CASE secret WHEN 0 THEN 'Nie' WHEN 1 THEN 'Áno' END AS "Tajná voľba" FROM voting ORDER BY id_voting ASC `, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })

}

// --- check - can vote? 0->False
userdb.checkVotingOpened = (voting_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT accept_answ FROM voting WHERE id_voting = ? `,[voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })

}

// --- check - voted yet? 0->False
userdb.checkVoted = (voting_id,user_id) => {
    return new Promise((resolve, reject) => {
        //TODO neviem ako sa odkazuje pri viacerých parametroch tak toto prosím pozri
        connection.query(`SELECT COUNT(*) FROM user-voting WHERE id_voting = ? AND id_user = ?`,[voting_id,user_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })

}

module.exports = userdb;
