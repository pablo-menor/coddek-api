const express = require('express');
const router = express.Router();
const developerService = require('../service/developer.service');
const OfferService = require('../service/offer.service');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
const res = require('express/lib/response');

const service = new developerService();
const offerService = new OfferService();

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
            role: developer.role,
        }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            user: developer
        });
    } else {
        res.status(400).json({
            message: 'Bad credentials'
        });
    }
});

router.post('/save-offer', verifyToken, async (req, res) => {
    const { offerId } = req.body;
    const { _id } = req.user;
    const isSaved = await service.saveOffer(_id, offerId);
    if (isSaved) {
        res.status(200).json({
            message: 'Offer saved'
        });
    } else {
        res.status(400).json({
            message: 'Problem saving offer'
        });
    }
});

router.post('/delete-saved-offer', verifyToken, async (req, res) => {
    const { offerId } = req.body;
    const { _id } = req.user;
    const isDeleted = await service.deleteOfferSaved(_id, offerId);
    if (isDeleted) {
        res.status(200).json({
            message: 'Offer deleted'
        });
    } else {
        res.status(400).json({
            message: 'Problem deleting offer'
        });
    }
});

router.get('/saved-offers', verifyToken, async (req, res) => {
    const { _id } = req.user;
    const offers = await service.getOffersSaved(_id);
    res.send(offers);
});

router.get('/', verifyToken, async (req, res) => {
    const developers = await service.getAll();
    res.send(developers);
});

router.get('/applied-offers/:userId', verifyToken, async (req, res) => {
    const offers = await service.getAppliedOffers(req.params.userId);
    let result = [];
    for (const offer of offers) {
        const offerDetails = await offerService.getById(offer.offerId);
        result.push({
            title: offerDetails.title,
            company_name: offerDetails.company.name,
            company_logo: offerDetails.company.avatar,
            tags: offerDetails.tags,
            show: offer.show,
            files: offer.files,
        });
    }
    res.send(result);
})

router.put('/update-dev', verifyToken, async (req, res) => {
    const {_id} = req.user
    const isUpdated = await service.update(_id, req.body)
    if(isUpdated)
        res.json({ message: 'User updated'})
    else {
        res.send(null)
    }
})

module.exports = router;