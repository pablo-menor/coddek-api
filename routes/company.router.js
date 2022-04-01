const express = require('express');
const router = express.Router();
const companyService = require('../service/company.service');


const service = new companyService();

router.post('/signup', async (req, res) => {
    const company = await service.signUp(req.body);
    res.send(company);
});

router.post('/login', async (req, res) => {
    const company = await service.checkLogin(req.body);
    res.send(company);
});

module.exports = router;