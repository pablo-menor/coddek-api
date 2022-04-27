const express = require('express');
const router = express.Router();
const developerService = require('../service/developer.service');
const devService = new developerService();
const companyService = require('../service/company.service');
const comService = new companyService();
const verifyToken = require('./verifyToken');

// Redirects to dev or company login 
router.post('/login', async (req, res) => {

    const dev = await devService.checkLogin(req.body);
    const url = dev ? '/api/developers/login' : '/api/companies/login';

    // 307 needed to preserve the POST method
    res.redirect(307, url);
});

// Returns the user's role to the frontend (using the token sent) 
router.get('/', verifyToken, async (req, res) => {
    res.status(200).json({ role: req.user.role });
});

// Returns the user's role and if its owned (using name on url)
router.get('/:username', verifyToken, async (req, res) => {
    const dev = await devService.getByUsername(req.params.username);
    const company = await comService.getByName(req.params.username);
    if (!dev && !company) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const role = dev ? 'developer' : 'company';
    if (dev && dev._id.equals(req.user._id) ) {
        res.status(200).json({ role, owned: true, user: dev });
    }
    else if (dev && !dev._id.equals(req.user._id)) {
        res.status(200).json({ role, owned: false, user: dev });
    }
    else if (company && company._id.equals(req.user._id)) {
        res.status(200).json({ role, owned: true, user: company });
    }
    else {
        res.status(200).json({ role, owned: false, user: company});
    }
});

module.exports = router;
