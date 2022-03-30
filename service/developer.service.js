const Developer = require('../model/developer.model');

class DeveloperService {
    constructor() { }

    async getById(id) {
        return await this.developer.findById(id);
    }

    async getByUsername(username) {
        return await Developer.findOne({ username });
    }

    async getByEmail(devEmail) {
        return await Developer.findOne({ email: devEmail });
    }

    async addDeveloper(developer) {
        const newDeveloper = new Developer(developer);
        return await newDeveloper.save();
    }
    // async update(id, data) {
    //     return await this.developer.findByIdAndUpdate(id, data, { new: true });
    // }

    // async delete(id) {
    //     return await this.developer.findByIdAndDelete(id);
    // }
}

module.exports = DeveloperService;