const express = require('express');
const router = express.Router();
const developerService = require('../service/developer.service');

const service = new developerService();

router.post('/signup', async (req, res) => {
    const developer = await service.addDeveloper(req.body);
    res.send(developer);
});

module.exports = router;