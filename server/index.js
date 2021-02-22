const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

var mysql = require('mysql');
const apiRouterLogin = require('./routes/user');
const apiRouterVoting = require('./routes/voting');

const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

//Simple Usage (Enable All CORS Requests)
app.use(cors())

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});


app.use(express.json());


app.listen(process.env.PORT || '4001', () => {
    console.log(`Server is running in port : ${process.env.PORT || '4001'}`);
});

app.use('/user', apiRouterLogin);
app.use('/voting', apiRouterVoting);