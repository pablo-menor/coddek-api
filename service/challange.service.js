const Challange = require('../model/challange.model');
const bcrypt = require('bcrypt');

class ChallangeService {
    constructor() { }

    async getById(id) {
        return await Challange.findById(id);
    }

    async getByTittle(title) {
        return await Challange.find({ title: title });
    }

}

module.exports = ChallangeService;