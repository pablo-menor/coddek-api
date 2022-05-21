const express = require('express');
const router = express.Router();
const ChallengeService = require('../service/challenge.service');
const challengeService = new ChallengeService();
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

// Creates a new challenge
router.post("/", upload.single('challenge'), async (req, res) => {
    const { title } = req.body;
    const { description } = req.body;
    const archives =  req.file.originalname

    const newChallenge = await challengeService.save({title, description, archives});
    const id = newChallenge._id.toString();
    res.json({id});
})

router.get("/:id", async (req, res) => {
    const challenge = await challengeService.getById(req.params.id);   
    res.json(challenge);
})

router
module.exports = router;
