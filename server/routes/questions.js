const express = require('express');
const db = require('../database');

const router = express.Router();

router.get('/questions', async (req,res,next) => {
    try {
        let results = await db.getAllQuestions();
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }
});

router.get('/q-count/:id', async (req,res,next) => {
    try {
        let results = await db.getQuestionsCountInVoting(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }

});

router.get('/qawording/:id', async (req,res,next) => {
    try {
        let results = await db.getQaAInVoting(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }
});

router.get('/qwording/:id', async (req,res,next) => {
    try {
        let results = await db.getQInVoting(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }
});

router.get('/getAnswers/:id', async (req,res,next) => {
    try {
        let results = await db.getAnswersByQID(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }
});

router.get('/getQuestionParams/:id', async (req,res,next) => {
    try {
        let results = await db.getQuestionParams(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }
});

router.post('/get-voting-questions', async (req,res,next) => {
    console.log("---------- voting: "+req.body.voting_id+" user:"+req.body.user_id);
    try {
        let results = await db.getVotingQuestions(req.body.voting_id, req.body.user_id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }
});



router.get('/q-a-count/:id', async (req,res,next) => {
    try {
        let results = await db.getAnswerCountPerQuestion(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }

});

router.get('/get-question/:id', async (req,res,next) => {
    try {
        let results = await db.getQuestion(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }

});


module.exports = router;