const Challenge = require('../model/challenge.model');
const bcrypt = require('bcrypt');

class ChallengeService {
    constructor() { }

    async getById(id) {
        try {
            return await Challenge.findById(id);
        }
        catch (error) {
            return null;
        }

    }

    async getByTittle(title) {
        return await Challenge.find({ title: title });
    }

    async save(challenge) {
        const newChallenge = new Challenge(challenge);
        return await newChallenge.save();
    }

}

module.exports = ChallengeService;