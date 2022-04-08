const express = require('express');
const router = express.Router();
const developerService = require('../service/developer.service');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

const service = new developerService();

router.post('/signup', async (req, res) => {
    const developer = await service.signUp(req.body);
    res.send(developer);
});

router.post('/login', async (req, res) => {
    const developer = await service.checkLogin(req.body);
    if (developer) {
        const token = jwt.sign({ 
            _id: developer._id,
            email: developer.email, 
            username: developer.username,
        }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            developer
        });
    } else {
        res.status(400).json({
            message: 'Bad credentials'
        });
    }
});

router.get('/', verifyToken ,async (req, res) => {
    const developers = await service.getAll();
    res.send(developers);
});


module.exports = router;