const express = require('express');
const router = express.Router();
const companyService = require('../service/company.service');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });

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
            name: company.name,
            role: company.role,
        }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            user: company
        });
    } else {
        res.status(400).json({
            message: 'Bad credentials'
        });
    }
});

router.put('/update-company', verifyToken, async (req, res) => {
    const { _id } = req.user
    const isUpdated = await service.update(_id, req.body)
    if (isUpdated)
        res.json({ message: 'Company updated' })
    else {
        res.send(null)
    }
})
router.put('/update-avatar', verifyToken, upload.single('avatar'), async (req, res) => {
    const { _id } = req.user
    const isUpdated = await service.update(_id, { avatar: req.file.originalname })
    if (isUpdated)
        res.json({ message: 'Company updated' })
    else {
        res.send(null)
    }
})

module.exports = router;