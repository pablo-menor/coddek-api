const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
        unique: true,
    },
    offers_published: [
        {
            offerId: String,
        }
    ]
})


module.exports = mongoose.model('Company', companySchema)