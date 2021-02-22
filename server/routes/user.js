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

router.post('/login', async (req,res,next) => {

    try {
        let results = await db.login(req.body.login, req.body.password);
        res.json(results);
    } catch(e) {
        res.status(401).json( {
            message: e
        });
    }

});

module.exports = router;