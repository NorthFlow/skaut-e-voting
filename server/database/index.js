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
        connection.query(`SELECT id_voting ,name , CASE accept_answ WHEN 0 THEN 'Nie' WHEN 1 THEN 'Áno' END , 
            CASE secret WHEN 0 THEN 'Nie' WHEN 1 THEN 'Áno' END , 
            (SELECT CASE COUNT(*) WHEN 0 THEN "Ešte nehlasované" ELSE "Už zahlasované" END 
                FROM user_voting  WHERE id_user= ? AND user_voting.id_voting=voting.id_voting) 
            FROM voting WHERE EXISTS (SELECT * FROM user_voting_relation  where user_voting_relation.can_vote=1 
            AND user_voting_relation.id_user= ? AND voting.id_voting=user_voting_relation.id_voting) 
            ORDER BY id_voting ASC`,[user_id, user_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
}

// --- OK voted yet? ak používateľ ešte nehlasoval vráti nulu
userdb.checkVoted = (question_id,user_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT COUNT(*) FROM user_voting 
        WHERE id_question = ? AND id_user = ?`,[question_id,user_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

// --- kontrola či môže používateľ hlasovať
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

// --- create blank voting
userdb.createVoting = (voting_name) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO voting (name) 
        VALUES (?)`,[voting_name], (err, result) => {
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
        connection.query(`SELECT id_question, COUNT(id_answer) AS acount FROM answers WHERE id_voting=? 
        GROUP BY (id_question) `,[voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

// --- vrati znenie otázok a odpovedí daneho votingu podľa jeho IDg
userdb.getQaAInVoting = (voting_id) => {
    //console.log(voting_id+" in select time");
    return new Promise((resolve, reject) => {
        connection.query(`SELECT questions.id_question as question, wording, id_answer, answer 
        FROM answers JOIN questions ON (questions.id_question=answers.id_question) WHERE answers.id_voting=?
        ORDER BY question ASC`,[voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

// --- vrati znenie otázok a odpovedí daneho votingu podľa jeho IDg
userdb.getQInVoting = (voting_id) => {
    //console.log(voting_id+" in select time");
    return new Promise((resolve, reject) => {
        connection.query(`SELECT questions.id_question as question, name, wording,
        FROM  questions WHERE id_voting=?
        ORDER BY question ASC`,[voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

// --- OK poznačenie že používateľ hlasoval v danej otázke
userdb.setMarkVoted = (question_id,user_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO user_voting(id_user,id_question) 
        VALUES (?,?)`,[user_id,question_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

// --- OK zápis odpovedí z hlasovania, !!! ak je hlasovanie tajné, musíme poslať null!!!
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

// --- OK výpis štatistiky hlasovania za otázku
userdb.getQuestionStats = (question_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT votes.id_question as question,wording,votes.id_answer as answer_id,answer, 
        COUNT(*) as count FROM votes JOIN questions USING (id_question) JOIN answers USING(id_answer) 
        WHERE votes.id_question=? GROUP BY id_answer`,[question_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

// --- OK vráti odpovede na otázku podľa jej ID
userdb.getAnswersByQID = (question_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id_answer,answer FROM answers WHERE id_question=? `,[question_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

// --- OK vráti názov a znenie otázky na základe jej ID
userdb.getQuestion = (question_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT name,wording FROM questions 
        WHERE id_question=?`,[question_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

// --- OK vráti či je hlasovanie v otázke spustené a či je tajné
userdb.getQuestionParams = (question_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT accept_answ,secret FROM questions 
        WHERE id_question=?`,[question_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

// ---OK vráti zoznam votingov dostupných pre používateľa v daným ID
userdb.getAvailableVoting = (user_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT voting.id_voting as id_voting,voting.name as name FROM voting 
        WHERE id_voting IN (SELECT user_voting_relation.id_voting FROM user_voting_relation 
        WHERE user_voting_relation.id_user=? AND user_voting_relation.can_vote=1)`,[user_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

// --- OK vráti zoznam otázok pre konkrétny voting
userdb.getVotingQuestions = (voting_id,user_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id_question ,name , CASE accept_answ 
        WHEN 0 THEN 'Nie' WHEN 1 THEN 'Áno' END AS otvorene , CASE secret WHEN 0 THEN 'Nie' 
        WHEN 1 THEN 'Áno' END AS secret, (SELECT CASE COUNT(*) WHEN 0 THEN "Ešte nehlasované" 
        ELSE "Už zahlasované" END  FROM user_voting WHERE id_user= ? 
        AND user_voting.id_question=questions.id_question) AS hlasovane FROM questions 
        WHERE id_voting= ? ORDER BY id_question ASC `,[user_id, voting_id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

module.exports = userdb;
