const Offer = require('../model/offer.model');
class OfferService {

    async create(offer) {
        try {
            const newOffer = new Offer(offer);
            let savedOffer = await newOffer.save();
            return savedOffer;
        }
        catch (error) {
            return null
        }
    }

    async getAllActiveOffers() {
        try {
            let offers = await Offer.find({ongoing: true});
            return offers;
        }
        catch (error) {
            return null
        }
    }
}

module.exports = OfferService;


