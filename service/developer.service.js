const Developer = require('../model/developer.model');
const bcrypt = require('bcrypt');

class DeveloperService {
    constructor() { }

    async getById(id) {
        return await Developer.findById(id);
    }

    async getByUsername(username) {
        try {
            const developers = await Developer.find({ 'username': { $regex: username, $options: 'i' } });
            let result = null;
            if (developers) {
                developers.forEach(dev => {
                    if (dev.username.toLowerCase() === username.toLowerCase()) {
                        result = dev;
                    }
                });
            }
            return result;
        }
        catch (error) {
            return null
        }
    }

    async getByEmail(devEmail) {
        return await Developer.findOne({ email: devEmail });
    }

    async signUp(developer) {
        try {
            developer.password = await bcrypt.hash(developer.password, 6);

            const newDeveloper = new Developer(developer);
            let savedDev = await newDeveloper.save();
            return {
                _id: savedDev._id,
                username: savedDev.username,
                email: savedDev.email,
                avatar: savedDev.avatar,
            }

        }
        catch (error) {
            return null
        }
    }
    async checkLogin(developer) {
        try {
            const dev = await this.getByEmail(developer.email);
            if (await bcrypt.compare(developer.password, dev.password)) {
                return {
                    _id: dev._id,
                    username: dev.username,
                    email: dev.email,
                    avatar: dev.avatar,
                    role: dev.role,
                    // avatar: dev.avatar,
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    async getAll() {
        return await Developer.find();
    }

    async saveOffer(devId, offerId) {
        try {
            const dev = await this.getById(devId);
            dev.offers_saved.push({ offerId });
            await dev.save();
            return true;
        } catch (error) {
            return false;
        }
    }

    async getOffersSaved(devId) {
        try {
            const dev = await this.getById(devId);
            return dev.offers_saved;
        } catch (error) {
            return [];
        }
    }

    async deleteOfferSaved(devId, offerId) {
        try {
            const dev = await this.getById(devId);
            dev.offers_saved = dev.offers_saved.filter(offer => offer.offerId !== offerId);
            await dev.save();
            return true;
        } catch (error) {
            return false;
        }
    }

    async getAppliedOffers(devId) {
        try {
            const dev = await this.getById(devId);
            return dev.applied_offers;
        } catch (error) {
            return [];
        }
    }
    async update(userId, data) {
        try {
            await Developer.updateOne({ _id: userId }, data)
            return true
        } catch (error) {
            return false
        }
    }

    async getCVs(devId) {
        try {
            const dev = await this.getById(devId);
            return dev.cvs;
        } catch (error) {
            return [];
        }
        
    }
}

module.exports = DeveloperService;