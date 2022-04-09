const express = require('express');
const router = express.Router();
const companyService = require('../service/company.service');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

const service = new companyService();

router.post('/signup', async (req, res) => {
    const company = await service.signUp(req.body);
    res.send(company);
});

router.post('/login', async (req, res) => {
    const company = await service.checkLogin(req.body);
    if (company) {
        const token = jwt.sign({
            _id: company._id,
            email: company.email,
            username: company.username,
            role: company.role,
        }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            company
        });
    } else {
        res.status(400).json({
            message: 'Bad credentials'
        });
    }
});

module.exports = router;