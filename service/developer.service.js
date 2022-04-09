const Developer = require('../model/developer.model');
const bcrypt = require('bcrypt');

class DeveloperService {
    constructor() { }

    async getById(id) {
        return await Developer.findById(id);
    }

    async getByUsername(username) {
        return await Developer.findOne({ username });
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
    // async update(id, data) {
    //     return await this.developer.findByIdAndUpdate(id, data, { new: true });
    // }

    // async delete(id) {
    //     return await this.developer.findByIdAndDelete(id);
    // }
}

module.exports = DeveloperService;