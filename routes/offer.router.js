const express = require('express');
const router = express.Router();
const OfferService = require('../service/offer.service');
const verifyToken = require('./verifyToken');

const offerService = new OfferService();

router.post('/create', verifyToken, async (req, res) => {
    req.body.company = {
        id: req.user._id,
        name: req.user.name,
        // avatar: companyInfo.avatar,
    }
    const offer = await offerService.create(req.body);
    if (offer) {
        res.status(200).json({
            message: 'Offer created successfully',
        });
    }
    else {
        res.send(null);
    }
})

router.get('/', verifyToken, async (req, res) => {
    const offers = await offerService.getAllActiveOffers();
    res.send(offers);
})

module.exports = router;
