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

    async signUp(developer) {
        try {
            const newDeveloper = new Developer(developer);
            return await newDeveloper.save();
        } catch (error) {
            return null
        }
    }
    async checkLogin(developer) {
        try {
            const dev = await this.getByEmail(developer.email);
            if (dev && dev.password === developer.password) {
                return {
                    _id: dev._id,
                    username: dev.username,
                    email: dev.email,
                    avatar: dev.avatar,
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    }
    async
    // async update(id, data) {
    //     return await this.developer.findByIdAndUpdate(id, data, { new: true });
    // }

    // async delete(id) {
    //     return await this.developer.findByIdAndDelete(id);
    // }
}

module.exports = DeveloperService;