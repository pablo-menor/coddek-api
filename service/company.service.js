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
        try {
            const companies =  await Company.find({ 'name': {$regex: name,$options:'i'} });
            let result = null;
            if (companies){
                companies.forEach(company => {
                    if (company.name.toLowerCase() === name.toLowerCase()){
                        result =  company;
                    }
                });
            }
            return result;
        }
        catch (error) {
            return null
        }
    }

    async signUp(company) {
        try {
            company.password = await bcrypt.hash(company.password, 6);

            const newCompany = new Company(company);
            let savedCompany = await newCompany.save();

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
                    _id: comp._id,
                    username: comp.name,
                    email: comp.email,
                    role: comp.role,
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    }
}

module.exports = CompanyService;