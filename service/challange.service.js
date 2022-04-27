const Challange = require('../model/challange.model');
const bcrypt = require('bcrypt');

class ChallangeService {
    constructor() { }

    async getById(id) {
        return await Challange.findById(id);
    }

    async getByTittle(tittle) {
        return await Challange.find({ tittle: tittle });
    }

}

module.exports = ChallangeService;