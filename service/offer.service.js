const Offer = require("../model/offer.model");
class OfferService {
  async create(offer) {
    try {
      const newOffer = new Offer(offer);
      let savedOffer = await newOffer.save();
      return savedOffer;
    } catch (error) {
      return null;
    }
  }

  async getAllActiveOffers() {
    try {
      let offers = await Offer.find({ ongoing: true });
      return offers;
    } catch (error) {
      return null;
    }
  }

  async getAllCompanyOffers(companyId) {
    try {
      let offers = await Offer.find({"company.id" : companyId});
      return offers;
    } catch (error) {
      return null;
    }
  }

  async getById(offerId) {
    try {
      let offer = await Offer.findById(offerId);
      return offer;
    } catch (error) {
      return null;
    }
  }
}

module.exports = OfferService;
