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

module.exports = router;