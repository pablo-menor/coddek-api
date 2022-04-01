const Company = require('../model/company.model');
const bcrypt = require('bcrypt');

class CompanyService {
    constructor() { }

    async getById(id) {
        return await Company.findById(id);
    }

    async getByEmail(companyEmail) {
        return await Company.findOne({ email: companyEmail });
    }

    async getByName(name) {
        return await Company.findOne({ name });
    }

    async signUp(company) {
        try {
            company.password = await bcrypt.hash(company.password, 6);
            
            const newCompany = new Company(company);
            let savedCompany = await newCompany.save(); //<-- ERROR
            console.log(savedCompany);
            return {
                _id: savedCompany._id,
                name: savedCompany.name,
                email: savedCompany.email,
            }
        } catch (error) {
            return null
        }
    }
    async checkLogin(company) {
        try {
            const comp = await this.getByEmail(company.email);
            if (await bcrypt.compare(company.password, comp.password)) {
                return {
                    name: comp.name,
                    email: comp.email,
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    }
}

module.exports = CompanyService;