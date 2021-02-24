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
        connection.query(`SELECT id_question ,wording ,name FROM questions JOIN voting 
        USING (id_voting) ORDER BY id_question ASC`, (err, results) => {
            if (err) {
                return reject(err);
            } 
            return resolve(results);
        });
    })
}
// --- return list of
userdb.getAllUserVotings = (user_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id_voting ,name , 
            CASE accept_answ WHEN 0 THEN 'Nie' WHEN 1 THEN 'Áno' END , 
            CASE secret WHEN 0 THEN 'Nie' WHEN 1 THEN 'Áno' END , 
            (SELECT CASE COUNT(*) WHEN 0 THEN "Ešte nehlasované" ELSE "Už zahlasované" END 
                FROM user_voting WHERE id_user= ? AND user_voting.id_voting=voting.id_voting) 
            FROM voting WHERE EXISTS (SELECT * FROM user_voting_relation where user_voting_relation.can_vote=1 
            AND user_voting_relation.id_user= ? AND voting.id_voting=user_voting_relation.id_voting) 
            ORDER BY id_voting ASC`,[user_id], (err, results) => {
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
        connection.query(`SELECT COUNT(*) FROM user_voting 
        WHERE id_voting = ? AND id_user = ?`,[voting_id,user_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- check - voted yet? 0->False
userdb.checkCanVote = (voting_id,user_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT can_vote FROM user_voting_relation 
        WHERE id_voting = ? AND id_user = ?`,[voting_id,user_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- create blank voting, by default closed
userdb.createVoting = (voting_name,is_secret) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO voting (name,accept_answ,secret) 
        VALUES ("?",0,?)`,[voting_name,is_secret], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- return voting ID by its name,
userdb.getVotingID = (voting_name) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id_voting FROM voting WHERE name='?'`,[voting_name], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- update voting, universal update to all columns
// UPDATE voting SET name='Test', accept_answ=(SELECT accept_answ FROM voting WHERE id_voting=6), secret=0 where id_voting=6
userdb.setVoting = (voting_id,voting_name,accept_answ,secret) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE voting SET name='?', accept_answ=?,secret=? 
        WHERE id_voting=?`,[voting_name,accept_answ,secret,voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- delete specific voting, you must firstly delete questions, answers and other references
userdb.delVoting = (voting_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM voting WHERE id_voting=?`,[voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- vrati pocet otazok daneho votingu podľa jeho ID
userdb.getQuestionsCountInVoting = (voting_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT COUNT(*) FROM questions WHERE id_voting=?`,[voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- vrati pocet odpovedi na otazky daneho votingu podľa jeho ID
userdb.getAnswerCountPerQuestion = (voting_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id_question, COUNT(id_answer) FROM answers WHERE id_voting=? 
        GROUP BY (id_question) `,[voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- vrati znenie otázok a odpovedí daneho votingu podľa jeho ID
userdb.getQaAInVoting = (voting_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id_question, wording, id_answer, answer 
        FROM answers JOIN questions USING (id_question) WHERE answers.id_voting=?`,[voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- poznačenie že používateľ hlasoval v danom votingu
userdb.setMarkVoted = (voting_id,user_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO user_voting(id_user,id_voting) 
        VALUES (?,?)`,[user_id,voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- zápis odpovedí z hlasovania, !!! ak je hlasovanie tajné, musíme poslať null!!!
userdb.setVote = (answer_id,question_id,voting_id,user_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO votes(id_answer, id_question, id_voting, id_user) 
        VALUES (?,?,?,?) `,[answer_id,question_id,voting_id,user_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
// --- výpis štatistiky hlasovania za voting
userdb.getVotingStats = (voting_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT votes.id_question,wording,votes.id_answer,answer, COUNT(*) 
        FROM votes JOIN questions USING (id_question) JOIN answers USING(id_answer) 
        WHERE votes.id_voting=? GROUP BY id_answer`,[voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}
module.exports = userdb;
