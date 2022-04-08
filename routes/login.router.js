const express = require('express');
const router = express.Router();
const developerService = require('../service/developer.service');
const devService = new developerService();

// Redirects to dev or company login 
router.post('/', async (req, res) => {

    const dev = await devService.checkLogin(req.body);
    const url = dev ? '/api/developers/login' : '/api/companies/login';

    // 307 needed to preserve the POST method
    res.redirect(307, url);
});

module.exports = router;
