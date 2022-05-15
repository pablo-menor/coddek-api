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

// All active offers
router.get('/', verifyToken, async (req, res) => {
    const offers = await offerService.getAllActiveOffers();
    res.send(offers);
})

// All offers from one company
router.get("/all", verifyToken, async(req, res) => {
    const offers = await offerService.getAllCompanyOffers(req.user._id);
    res.send(offers);

})

//Find offers by input
router.get('/search/:input', async (req, res)=>{
    res.json( await offerService.findByInput(req.params.input)); 
})

module.exports = router;