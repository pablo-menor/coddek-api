const express = require('express');
const router = express.Router();
const OfferService = require('../service/offer.service');
const CompanyService = require('../service/company.service');
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

const offerService = new OfferService();
const companyService = new CompanyService();

router.post('/create', verifyToken, async (req, res) => {
    const company = await companyService.getById(req.user._id);
    req.body.company = {
        id: req.user._id,
        name: company.name,
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
router.get("/all", verifyToken, async (req, res) => {
    const offers = await offerService.getAllCompanyOffers(req.user._id);
    res.send(offers);

})

//Find offers by input
router.get('/search/:input', async (req, res) => {
    res.json(await offerService.findByInput(req.params.input));
})

router.post("/upload-solution/:offerId", upload.single('solution') , verifyToken, async (req, res) => {
    const { offerId } = req.params;
    const { _id } = req.user;
    const isUploaded = await offerService.uploadSolution(_id, offerId, req);
    if (isUploaded) {
        res.status(200).json({
            message: 'Solution uploaded'
        });
    }
    else {
        res.status(400).json({
            message: 'Problem uploading solution'
        });
    }
})

module.exports = router;