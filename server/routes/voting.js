const express = require('express');
const db = require('../database');

const router = express.Router();

router.get('/all', async (req,res,next) => {
    try {
        let results = await db.getAllUsers();
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

router.get('/available-votings/:id', async (req,res,next) => {
    try {
        let results = await db.getAvailableVoting(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }
});

router.get('/checkVoted/:id_q:id_u', async (req,res,next) => {
    try {
        let results = await db.checkVoted(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }
});

router.get('/checkCanVote/:id_v:id_u', async (req,res,next) => {
    try {
        let results = await db.checkCanVote(req.params.id);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }
});

// ------------ inserty
router.post('/set-vote', async (req,res,next) => {
    try {
        let results = await db.setVote(req.body.answer_id, req.body.question_id, req.body.user_id);
        res.json(results);
    } catch(e) {
        res.status(404).json( {
            message: e
        });
    }
});

router.post('/set-mark-voted', async (req,res,next) => {
    try {
        let results = await db.setMarkVoted(req.body.question_id, req.body.user_id);
        res.json(results);
    } catch(e) {
        res.status(404).json( {
            message: e
        });
    }
});



module.exports = router;

