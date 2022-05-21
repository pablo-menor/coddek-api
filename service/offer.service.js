const Offer = require("../model/offer.model");
const DeveloperService = require("./developer.service");
class OfferService {
  constructor() { 
    this.devService = new DeveloperService();
  }
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
      let offers = await Offer.find({ "company.id": companyId });
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

  async findByInput(input) {
    const search = input.replace('+', ' ')
    let result = [];
    try {
      result = await Offer.find({ 'title': { $regex: search, $options: 'i' } })
    } catch (error) {
      result = [];
    }
    return result;
  }

  async uploadSolution(userId, offerId, req) {
    let offer = await Offer.findById(offerId);
    offer.devs.push({
      userId: userId,
      cv: req.body.cv,
      solution: req.file.originalname
    });
    let updatedOffer = await Offer.updateOne({ _id: offerId }, offer);
    //  Remove offer from developer's saved ones
    let dev = await this.devService.getById(userId);
    dev.offers_saved = dev.offers_saved.filter(offer => offer.offerId !== offerId);
    // Add offer to developer's applied ones
    // dev.applied_offers = dev.applied_offers.filter(offer => offer.offerId !== offerId);
    dev.applied_offers.push({
      offerId: offerId,
      show: true,
      files: req.file.originalname
    });
    await this.devService.update(userId, dev);
  
    return updatedOffer;
  }
}

module.exports = OfferService;
