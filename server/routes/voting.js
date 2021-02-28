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



module.exports = router;

