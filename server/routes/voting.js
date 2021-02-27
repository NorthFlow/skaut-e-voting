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

router.get('/all-votings/:id', async (req,res,next) => {
    try {
        let results = await db.getAllUserVotings(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }

});



module.exports = router;

